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
/**
 * @name SDL.Button
 * @desc Universal button component for SDL application
 * @category Controlls
 * @filesource app/controlls/Button.js
 * @version 1.0
 */

SDL.Button = Em.View.extend(Ember.TargetActionSupport,
  {
    classNames: [
      'ffw-button', 'notpressed'
    ],

    classNameBindings: [
      'pressed', 'disabled', 'hidden',
      'dayMode','nightMode','highLightedMode'
    ],

    /** Pressed state binding */
    pressed: false,

    /** Disable actions on button */
    disabled: false,

    dayMode:false,
    nightMode:false,
    highLightedMode:false,
    /** Button icon class */
    icon: null,
    isTemplate: null,
    secondaryIcon: null,
    isSecondaryTemplate: null,

    /** Button rightIcon class */
    righticon: null,

    /** Button text */
    text: null,
    secondaryText: null,
    tertiaryText: null,

    rightText: null,

    target: this.target ? this.target : this,

    /** Arrow icon */
    arrow: false,

    /** Button timer flag */
    timer: 0,

    timerId: null,
    /** Touch leave event flag */
    touchleave: false,

    onDown: true,

    helpMode: false,
    /**  */
    targetElement: null,
    setMode:function(mode){
      this.set('dayMode',false);
      this.set('nightMode',false);
      this.set('highLightedMode',false);
      switch(mode){
        case SDL.SDLModel.data.imageModeList[0]:this.set('dayMode',true);break;
        case SDL.SDLModel.data.imageModeList[1]:this.set('nightMode',true);break;
        case SDL.SDLModel.data.imageModeList[2]:this.set('highLightedMode',true);break;
        default:this.set('dayMode',true);
      }
    },

    actionDown: function(event) {

      if (this.get('disabled')) {
        return;
      }

      var self = this;

      this.set('pressed', true);
      /** Set Mouse Leave Event Flag to false */
      this.set('mouseleave', false);

      // Default trigger action
      if (this.onDown) {
        this.triggerAction();
      }

      // Call trigger with timeout
      if (this.timer) {
        this.timerId = setInterval(function() {

          self.triggerAction();
        }, this.timer
      );
      }
    },

    actionUp: function(event) {

      this.set('pressed', false);

      if (this.timer) {
        clearInterval(this.timerId);
      }

      if (this.get('disabled')) {
        if (this.touchleave == true) {
          this.set('touchleave', false);
        }
        return;
      }

      if (!this.onDown) {
        this.triggerAction();
      }
    },

    /** Only for desktop */
    mouseLeave: function(event) {

      this.set('pressed', false);

      if (this.timer) {
        clearInterval(this.timerId);
      }
    },

    /**
     * Only for IOS Simulation of mouseleave event for touch devices If
     * target element looses focus during touch move event events dont
     * trigger
     */
    touchMove: function(event) {

      /** Set Mouse Leave Event Flag to true */
      this.set('touchleave', this.targetElement !==
        document.elementFromPoint(event.originalEvent.touches[0].pageX,
          event.originalEvent.touches[0].pageY
        )
      );
    },

    didInsertElement: function(){
      // $(this) wraps the ember view in a jquery object.
      // `icon` is a view property defined above.
      if ($(this)[0].icon) {
        // this.$('img') returns a jquery instance of
        // the img element inside of the SDL.Button
        this.$('img').on('error', function(event) {
          var regex = /\?(.*)/g;
          SDL.SDLController.onUpdateFile($(this)[0].icon.replace(regex, ""));
        }.bind(this));
      }
    },

    // component default template
    defaultTemplate: Em.Handlebars.compile(
      '<img {{bindAttr class="view.icon:ico"}} {{bindAttr src="view.icon"}} />' +
      '<span>{{view.text}}</span>'
    ),

    templates: {
      text: Em.Handlebars.compile('<span class="text">{{view.text}}</span>'),

      textOverlay: Em.Handlebars.compile(
        '<img {{bindAttr class="view.icon:ico-overlay"}} />' +
        '<img {{bindAttr class="view.icon:ico"}} {{bindAttr src="view.icon"}} />' +
        '<span class="text">{{view.text}}</span>'
      ),

      icon: Em.Handlebars.compile(
        '<img class="ico" \
          {{bindAttr src="view.icon"}} />'
      ),

      iconOverlay: Em.Handlebars.compile(
        '<img {{bindAttr class="view.icon:ico-overlay"}}  />' +
        '<img class="ico" {{bindAttr src="view.icon"}} />'
      ),

      subtle: Em.Handlebars.compile(
        '<img {{bindAttr class="view.icon:ico"}} {{bindAttr src="view.icon"}} />' +
        '<span>{{view.text}}</span>'
      ),

      subtleOverlay: Em.Handlebars.compile(
        '<img style="left: 468px;" {{bindAttr class="view.icon:ico-overlay"}}  />' +
        '<img {{bindAttr class="view.icon:ico"}} {{bindAttr src="view.icon"}} />' +
        '<span>{{view.text}}</span>'
      ),

      rightText: Em.Handlebars.compile(
        '<img {{bindAttr class="view.icon:ico"}} \
          {{bindAttr src="view.icon"}} />' +
        '<span class="right_text">{{view.text}}</span>'
      ),
      rightTextOverLay: Em.Handlebars.compile(
        '<img {{bindAttr class="view.icon:ico-overlay"}}  />' +
        '<img {{bindAttr class="view.icon:ico"}} \
          {{bindAttr src="view.icon"}} />' +
        '<span class="right_text">{{view.text}}</span>'
      ),

      arrow: Em.Handlebars.compile(
        '<img {{bindAttr class="view.icon:ico"}} \
          {{bindAttr src="view.icon"}} />' +
        '<span>{{view.text}}</span>' +
        '<img class="arrow-ico" src="images/common/arrow_ico.png" />'
      ),
      arrowShort: Em.Handlebars.compile(
        '<img {{bindAttr class="view.icon:ico"}} {{bindAttr src="view.icon"}} />' +
        '<span>{{view.text}}</span>' +
        '<img class="arrow-ico-short" src="images/common/arrow_ico.png" />'
      ),
      arrowShortOverLay: Em.Handlebars.compile(
        '<img {{bindAttr class="view.icon:ico-overlay"}}  />' +
        '<img {{bindAttr class="view.icon:ico"}} {{bindAttr src="view.icon"}} />' +
        '<span>{{view.text}}</span>' +
        '<img class="arrow-ico-short" src="images/common/arrow_ico.png" />'
      ),

      rightIcon: Em.Handlebars.compile(
        '<img {{bindAttr class="view.icon:ico"}} \
          {{bindAttr src="view.icon"}} />' +
        '<span>{{view.text}}</span>' +
        '<img class="right_ico" {{bindAttr src="view.righticon"}} />'
      ),

      extended: Em.Handlebars.compile(
        '<div class="extended-button">' +
          '{{#if view.isTemplate}}' +
          '<img {{bindAttr class="view.icon:ico-overlay"}}  />' +
          '{{/if}}' +
          '<img {{bindAttr class="view.icon:ico"}} \
          {{bindAttr src="view.icon"}} />' +
          '<div class="main-text">' +
            '<span class="w-100">{{view.text}}</span>' +
            '<span class="w-100 t-small">{{view.secondaryText}}</span>' +
          '</div>' +
          '<div class="end-info">' +
            '<span class="w-50 t-small tertiary-text">{{view.tertiaryText}}</span>' +
            '{{#if view.isSecondaryTemplate}}' +
            '<img {{bindAttr class="view.secondaryIcon:ico-overlay"}}  />' +
            '{{/if}}' +
            '<img {{bindAttr class="view.secondaryIcon:ico"}} \
            {{bindAttr src="view.secondaryIcon"}} />' +
          '</div>'+
        '</div>'
      ),

      arrowExtended: Em.Handlebars.compile(
        '<div class="extended-button">' +
          '{{#if view.isTemplate}}' +
          '<img {{bindAttr class="view.icon:ico-overlay"}}  />' +
          '{{/if}}' +
          '<img {{bindAttr class="view.icon:ico"}} \
          {{bindAttr src="view.icon"}} />' +
          '<div class="main-text">' +
            '<span class="w-100">{{view.text}}</span>' +
            '<span class="w-100 t-small">{{view.secondaryText}}</span>' +
          '</div>' +
          '<div class="end-info">' +
            '<span class="w-50 t-small tertiary-text">{{view.tertiaryText}}</span>' +
            '<div class="relative-r-0">' +
            '{{#if view.isSecondaryTemplate}}' +
            '<img {{bindAttr class="view.secondaryIcon:ico-overlay"}}  />' +
            '{{/if}}' +
            '<img {{bindAttr class="view.secondaryIcon:ico"}} \
            {{bindAttr src="view.secondaryIcon"}} />' +
            '</div>' +
            '<img class="arrow-ico relative-r-0" src="images/common/arrow_ico.png" />' +
          '</div>'+
        '</div>'
      )
    }
  }
);
