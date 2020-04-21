/*
 * Copyright (c) 2013, Ford Motor Company All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met: ·
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer. · Redistributions in binary
 * form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided
 * with the distribution. · Neither the name of the Ford Motor Company nor the
 * names of its contributors may be used to endorse or promote products derived
 * from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
/*
 * Reference implementation of Navigation component.
 *
 * Interface to get or set some essential information sent from SDLCore.
 * Navigation is responsible for the navigationApp functionality provided by the
 * application: display graphics and multimedia components, is responsible for
 * the transfer of managed manipulations, generated by the user to the server.
 *
 */
FFW.Navigation = FFW.RPCObserver.create(
  {
    /**
     * If true then Navigation is present and ready to communicate with SDL.
     *
     * @type {Boolean}
     */
    isReady: true,
    /**
     * Contains response codes for request that should be processed but there
     * were some kind of errors
     * Error codes will be injected into response.
     */
    errorResponsePull: {},
    /**
     * Contains pointer to currently active popup window with start Audio
     * streaming in the model or null if does not exists
     */
    startAudioStreamingPopup: null,
    /**
     * Contains pointer to currently active popup window with start Video
     * streaming in the model or null if does not exists
     */
    startVideoStreamingPopup: null,
    /**
     * access to basic RPC functionality
     */
    client: FFW.RPCClient,
    onAudioDataStreamingSubscribeRequestID: -1,
    onVideoDataStreamingSubscribeRequestID: -1,
    onAudioDataStreamingUnsubscribeRequestID: -1,
    onVideoDataStreamingUnsubscribeRequestID: -1,
    onAudioDataStreamingNotification: 'Navigation.OnAudioDataStreaming',
    onVideoDataStreamingNotification: 'Navigation.OnVideoDataStreaming',
    componentName: "Navigation",
    // temp var for debug
    appID: 1,
    /**
     * connect to RPC bus
     */
    connect: function() {
      this.client.connect(this.componentName, this);
    },

    /**
     * @function sendMessage
     * @param {Em.Object} JSONMessage
     * @desc sending message to SDL
     */
    sendMessage: function(JSONMessage){
      this.client.send(JSONMessage, this.componentName);
    },

    /**
     * @function subscribeToNotification
     * @param {Em.Object} notification
     * @desc subscribe to notifications from SDL
     */
    subscribeToNotification: function(notification){
      this.client.subscribeToNotification(notification, this.componentName);
    },

    /**
     * disconnect from RPC bus
     */
    disconnect: function() {
      this.onRPCUnregistered();
      this.client.disconnect();
    },

    /**
     * Client is registered - we can send request starting from this point of
     * time
     */
    onRPCRegistered: function() {
      Em.Logger.log('FFW.Navigation.onRPCRegistered');
      this._super();
      // subscribe to notifications
      this.onAudioDataStreamingSubscribeRequestID = this
        .subscribeToNotification(this.onAudioDataStreamingNotification);
      this.onVideoDataStreamingSubscribeRequestID = this
        .subscribeToNotification(this.onVideoDataStreamingNotification);
    },
    /**
     * Client is unregistered - no more requests
     */
    onRPCUnregistered: function() {
      Em.Logger.log('FFW.Navigation.onRPCUnregistered');
      this._super();
      // unsubscribe from notifications
      this.onAudioDataStreamingUnsubscribeRequestID = this.client
        .unsubscribeFromNotification(this.onAudioDataStreamingNotification);
      this.onVideoDataStreamingUnsubscribeRequestID = this.client
        .unsubscribeFromNotification(this.onVideoDataStreamingNotification);
    },
    /**
     * Client disconnected.
     */
    onRPCDisconnected: function() {
    },
    /**
     *
     * when result is received from RPC component this function is called It is
     * the proper place to check results of request execution Please use
     * previously store requestID to determine to which request response belongs
     * to
     *
     * @param {Object} response
     */
    onRPCResult: function(response) {
      Em.Logger.log('FFW.Navigation.onRPCResult');
      this._super();
    },
    /**
     * handle RPC erros here
     *
     * @param {Object} error
     */
    onRPCError: function(error) {
      Em.Logger.log('FFW.Navigation.onRPCError');
      this._super();
    },
    /**
     * handle RPC notifications here
     */
    onRPCNotification: function(notification) {
      Em.Logger.log('FFW.Navigation.onRPCNotification');
      this._super();
      if (notification.method == this.onVideoDataStreamingNotification) {
        if (notification.params.available) {
          SDL.SDLModel.startStream();
        } else {
          SDL.SDLModel.stopStream();
        }
      }
      if (notification.method == this.onAudioDataStreamingNotification) {
        if (notification.params.available) {
          SDL.SDLModel.startAudioStream();
        } else {
          SDL.SDLModel.stoptAudioStream();
        }
      }
    },
    /**
     * handle RPC requests here
     */
    onRPCRequest: function(request) {
      Em.Logger.log('FFW.Navigation.onRPCRequest');
      if (this.validationCheck(request)) {
        switch (request.method) {
          case 'Navigation.IsReady':
          {
            Em.Logger.log('FFW.' + request.method + 'Response');
            // send repsonse
            var JSONMessage = {
              'jsonrpc': '2.0',
              'id': request.id,
              'result': {
                'available': this.get('isReady'),
                'code': SDL.SDLModel.data.resultCode.SUCCESS,
                'method': 'Navigation.IsReady'
              }
            };
            this.sendMessage(JSONMessage);
            break;
          }
          case 'Navigation.GetWayPoints':
          {
            Em.Logger.log('FFW.' + request.method + 'Response');
            SDL.NavigationController.getWayPoint(request);
            break;
          }
          case 'Navigation.SubscribeWayPoints':
          {
            Em.Logger.log('FFW.' + request.method + 'Response');
            SDL.NavigationController.subscribeWayPoints(request);
            break;
          }
          case 'Navigation.UnsubscribeWayPoints':
          {
            Em.Logger.log('FFW.' + request.method + 'Response');
            SDL.NavigationController.unsubscribeWayPoints(request);
            break;
          }
          case 'Navigation.AlertManeuver':
          {

            // Verify if there is an unsupported data in request
            if (this.errorResponsePull[request.id] != null) {
              //
              ////Check if there is any available data to  process the request
              //if ("softButtons" in request.params) {
              //
              //    this.errorResponsePull[request.id].code =
              // SDL.SDLModel.data.resultCode["WARNINGS"]; } else { If no
              // available data sent error response and stop process current
              // request
              this.sendError(
                this.errorResponsePull[
                  request.id].code,
                request.id,
                request.method,
                'Unsupported ' + this.errorResponsePull[request.id].type +
                ' type. Request was not processed.'
              );
              this.errorResponsePull[request.id] = null;
              return;
              //}
            }
            SDL.AlertManeuverPopUp.AlertManeuverActive(request)
            break;
          }
          case 'Navigation.ShowConstantTBT':
          {

            // Verify if there is an unsupported data in request
            if (this.errorResponsePull[request.id] != null) {
              this.sendError(
                this.errorResponsePull[
                  request.id].code,
                request.id,
                request.method,
                'Unsupported ' + this.errorResponsePull[request.id].type +
                ' type. Request was not processed.'
              );
              this.errorResponsePull[request.id] = null;
            } else {
              SDL.NavigationController.validateIcons(request);
              SDL.SDLModel.tbtActivate(request.params);
            }
            break;
          }
          case 'Navigation.UpdateTurnList':
          {

            // Verify if there is an unsupported data in request
            if (this.errorResponsePull[request.id] != null) {
              //
              ////Check if there is any available data to  process the request
              //if ("turnList" in request.params || "softButtons" in
              // request.params) {  this.errorResponsePull[request.id].code =
              // SDL.SDLModel.data.resultCode["WARNINGS"]; } else { If no
              // available data sent error response and stop process current
              // request
              this.sendError(
                this.errorResponsePull[
                  request.id].code,
                request.id,
                request.method,
                'Unsupported ' + this.errorResponsePull[request.id].type +
                ' type. Request was not processed.'
              );
              this.errorResponsePull[request.id] = null;
              //}
            }
            SDL.NavigationController.validateIcons(request);
            SDL.SDLModel.tbtTurnListUpdate(request.params);
            break;
          }
          case 'Navigation.StartAudioStream':
          {
            var text = 'Would you like to start Audio stream?';
            if (this.startAudioStreamingPopup && this.startAudioStreamingPopup.active) {
              this.startAudioStreamingPopup.deactivate();
            }

            this.startAudioStreamingPopup = SDL.PopUp.create().appendTo('body').popupActivate(
              text, function(result) {
                if (result) {
                  FFW.Navigation.sendNavigationResult(
                    SDL.SDLModel.data.resultCode.SUCCESS,
                    request.id,
                    request.method
                  );
                } else if (result === false) {
                  FFW.Navigation.sendError(
                    SDL.SDLModel.data.resultCode.REJECTED,
                    request.id,
                    request.method,
                    'Ignored by USER!'
                  );
                }
              }
            );
            SDL.SDLController.getApplicationModel(
              request.params.appID
            ).navigationAudioStream = request.params.url;
            break;
          }
          case 'Navigation.StopAudioStream':
          {
            SDL.SDLController.getApplicationModel(
              request.params.appID
            ).navigationAudioStream = null;
            if (this.startAudioStreamingPopup && this.startAudioStreamingPopup.active) {
              this.startAudioStreamingPopup.deactivate();
              this.set('startAudioStreamingPopup', null);
            }
            this.sendNavigationResult(
              SDL.SDLModel.data.resultCode.SUCCESS,
              request.id,
              request.method
            );
            break;
          }
          case 'Navigation.SetVideoConfig':
          {
            var rejectedParams = [];
            var video_formats = SDL.systemCapabilities.videoStreamingCapability.supportedFormats;
            if ('protocol' in request.params.config) {
              video_formats = video_formats.filter(x => x.protocol === request.params.config.protocol);
              if (video_formats.length === 0) {
                Em.Logger.log('FFW.' + request.method + ' rejects protocol: '
                              + request.params.config.protocol);
                rejectedParams.push('protocol');
              }
            }
            if ('codec' in request.params.config && video_formats.length > 0) {
              video_formats = video_formats.filter(x => x.codec === request.params.config.codec);
              if (video_formats.length === 0) {
                Em.Logger.log('FFW.' + request.method + ' rejects codec: '
                              + request.params.config.codec);
                rejectedParams.push('codec');
              }
            }
            if (rejectedParams.length > 0) {
              var JSONMessage = {
                'jsonrpc': '2.0',
                'id': request.id,
                'result': {
                  'code': SDL.SDLModel.data.resultCode.REJECTED,
                  'method': request.method,
                  'rejectedParams': rejectedParams
                }
              };
              this.sendMessage(JSONMessage);
            } else {
              this.sendNavigationResult(
                SDL.SDLModel.data.resultCode.SUCCESS,
                request.id,
                request.method
              );
            }
            break;
          }
          case 'Navigation.StartStream':
          {
            var text = 'Would you like to start Video stream?';
            if (this.startVideoStreamingPopup && this.startVideoStreamingPopup.active) {
              this.startVideoStreamingPopup.deactivate();
            }

            this.startVideoStreamingPopup = SDL.PopUp.create().appendTo('body').popupActivate(
              text, function(result) {
                if (result) {
                  SDL.SDLController.getApplicationModel(request.params.appID)
                    .set('navigationStream', request.params.url);
                  FFW.Navigation.sendNavigationResult(
                    SDL.SDLModel.data.resultCode.SUCCESS,
                    request.id,
                    request.method
                  );
                } else if (result === false) {
                  FFW.Navigation.sendError(
                    SDL.SDLModel.data.resultCode.REJECTED,
                    request.id,
                    request.method,
                    'Ignored by USER!'
                  );
                }
              }
            );
            SDL.SDLController.getApplicationModel(
              request.params.appID
            ).navigationStream = request.params.url;

            break;
          }
          case 'Navigation.StopStream':
          {
            SDL.SDLController.getApplicationModel(
              request.params.appID
            ).navigationStream = null;
            if (this.startVideoStreamingPopup && this.startVideoStreamingPopup.active) {
              this.startVideoStreamingPopup.deactivate();
              this.set('startVideoStreamingPopup', null);
            }
            this.sendNavigationResult(
              SDL.SDLModel.data.resultCode.SUCCESS,
              request.id,
              request.method
            );
            break;
          }
          case 'Navigation.SendLocation':
          {

            // Verify if there is an unsupported data in request
            if (this.errorResponsePull[request.id] != null) {
              this.sendError(
                this.errorResponsePull[
                  request.id].code,
                request.id,
                request.method,
                'Unsupported ' + this.errorResponsePull[request.id].type +
                ' type. Request was not processed.'
              );
              this.errorResponsePull[request.id] = null;
              //this.errorResponsePull[request.id].code =
              // SDL.SDLModel.data.resultCode["WARNINGS"];
            } else {
              SDL.NavigationController.sendLocation(request);
            }
            break;
          }
        }
      }
    },
    /**
     *  Send error response from onRPCRequest
     *
     * @param {Number} resultCode
     * @param {Number} id
     * @param {String} method
     * @param {String} message
     */
    sendError: function(resultCode, id, method, message) {
      Em.Logger.log('FFW.' + method + 'Response');
      if (resultCode != SDL.SDLModel.data.resultCode.SUCCESS) {

        // send repsonse
        var JSONMessage = {
          'jsonrpc': '2.0',
          'id': id,
          'error': {
            'code': resultCode, // type (enum) from SDL protocol
            'message': message,
            'data': {
              'method': method
            }
          }
        };
        this.sendMessage(JSONMessage);
      }
    },
    /**
     * send response from onRPCRequest
     *
     * @param {Number} resultCode
     * @param {Number} id
     * @param {String} method
     */
    sendNavigationResult: function(resultCode, id, method, info) {
      if (this.errorResponsePull[id] != null) {
        this.sendError(
          this.errorResponsePull[id].code,
          id,
          method,
          'Unsupported ' + this.errorResponsePull[id].type +
          ' type. Available data in request was processed.'
        );
        this.errorResponsePull[id] = null;
        return;
      }
      Em.Logger.log('FFW.UI.' + method + 'Response');
      if (resultCode === SDL.SDLModel.data.resultCode.SUCCESS ||resultCode == SDL.SDLModel.data.resultCode.WARNINGS ) {

        // send repsonse
        var JSONMessage = {
          'jsonrpc': '2.0',
          'id': id,
          'result': {
            'code': resultCode, // type (enum) from SDL protocol
            'method': method
          }
        };

        if(info != null) {
          JSONMessage.result.info = info;
        }

        this.sendMessage(JSONMessage);
      }
    },
    /**
     * Response sender for GetWayPoints request
     *
     * @param {Number} resultCode
     * @param {Object} data
     * @param {number} id
     */
    wayPointSend: function(resultCode, data, id, appID) {
      if (resultCode == SDL.SDLModel.data.resultCode.SUCCESS &&
        data && id) {
        // send repsonse
        var JSONMessage = {
          'jsonrpc': '2.0',
          'id': id,
          'result': {
            'code': resultCode, // type (enum) from SDL protocol
            'appID': appID,
            'wayPoints': data,
            'method': 'Navigation.GetWayPoints'
          }
        };
        this.sendMessage(JSONMessage);
      } else if (resultCode == SDL.SDLModel.data.resultCode.IN_USE) {
        FFW.Navigation.sendError(
          resultCode, id, 'Navigation.GetWayPoints',
          'Current WayPoint is under processing'
        );
      }
    },
    /**
     * Notification sender for onWayPointChange
     *
     * @param {Object} data
     */
    onWayPointChange: function(data) {
      var JSONMessage = {
        'jsonrpc': '2.0',
        'method': 'Navigation.OnWayPointChange',
        'params': {
          'wayPoints': data
        }
      };
      this.sendMessage(JSONMessage);
    },
    /**
     * Notifies if TBTClientState was activated
     *
     * @param {String} state
     * @param {Number} appID
     */
    onTBTClientState: function(state, appID) {
      Em.Logger.log('FFW.Navigation.OnTBTClientState');
      // send repsonse
      var JSONMessage = {
        'jsonrpc': '2.0',
        'method': 'Navigation.OnTBTClientState',
        'params': {
          'state': state
        }
      };
      this.sendMessage(JSONMessage);
    }
  }
);
