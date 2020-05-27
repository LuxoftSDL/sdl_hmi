/*
 * Copyright (c) 2020, Ford Motor Company All rights reserved.
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
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
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
 * @name SDL.ObsshModel
 * @desc Obssh model
 * @category Model
 * @filesource app/model/ObsshModel.js
 * @version 1.0
 */

SDL.ObsshModel = Em.Object.extend({
    
    TareStatusList: [
      "NOREQUEST",
      "REQUEST",
      "NOT_USED",
      "FAULTY"
    ],

    TailLightModeStatusList: [
      "NO_TAIL_LIGHT_ACTIVE",
      "PAYLOAD_MODE_ACTIVE",
      "HITCH_LOAD_MODE_ACTIVE",
      "WEIGHT_DISTRIBUTION_MODE_ACTIVE",
      "TAIL_LIGHT_CONTROL_OVERRIDDEN",
      "NOT_USED_1",
      "NOT_USED_2",
      "FAULTY"
    ],

    FrontAxleLoadRestorationStatusList: [
      "INACTIVE",
      "FIRST_MEASUREMENT_COLLECTED",
      "SECOND_MEASURMENT_COLLECTED",
      "HEIGHT_CORRECTION_COMPLETE",
      "NOT_USED_1",
      "NOT_USED_2",
      "NOT_USED_3",
      "FAULTY"
    ],

    ScreenModeList: [
      "SCALE_SCREEN_NOT_ACTIVE",
      "PAYLOAD_EST_SCREEN_ACTIVE",
      "ADD_MASS_EST_SCREEN_ACTIVE",
      "WEIGHT_DIST_SCREEN_ACTIVE",
      "FIFTH_WHEEL_SCREEN_ACTIVE",
      "GOOSENECK_SCREEN_ACTIVE",
      "WEIGHT_CARRY_SCREEN_ACTIVE",
      "CHECK_LOAD_SCREEN_ACTIVE"
    ],

    TailLightModeList: [
      "ACTIVATE_PAYLOAD_MODE",
      "ACTIVATE_HITCH_LOAD_MODE",
      "ACTIVATE_WEIGHT_DISTRIBUTION_MODE",
      "DEACTIVATE_ALL"
    ],

    FrontAxleLoadRestorationList: [
      "EXIT",
      "REQUEST_FIRST_MEASUREMENT",
      "REQUEST_SECOND_MEASUREMENT",
      "COMPLETE"
    ],

    ObsshDisplayUnitList: [
      "KG",
      "LB"
    ],

    CheckedValuesList: [
      "NO",
      "YES"
    ],

    ObsshDataEnabled : {
      checkFlatSurface: true,
      checkGear: true,
      checkSteeringWheel: true,
      checkTirePressure: true,
      displayUnit: true,
      factoryCurbWeight: true,
      frontAxleLoadRestoration: true,
      frontAxleLoadRestorationPercent: true,
      frontAxleLoadRestorationStatus: true,
      frontGrossAxleWeightRating: true,
      grossCombinedWeightRating: true,
      grossVehicleWeightRating: true,
      maxBedTrailerWeight: true,
      maxHitchTrailerWeight: true,
      passengerWeight: true,
      payload: true,
      payloadPercent: true,
      rearGrossAxleWeightRating: true,
      screenMode: true,
      screenModeStatus: true,
      screenStep: true,
      tailLightMode: true,
      tailLightModeStatus: true,
      tare: true,
      tareStatus: true,
      taredPayload: true,
      trailerTongueLoad: true,
      trailerTongueLoadPercent: true,
      trailerWeight: true,
      trailerWeightStatus: true
    },

    ObsshData : {
      checkFlatSurface: 'YES',
      checkGear: 'YES',
      checkSteeringWheel: 'YES',
      checkTirePressure: 'YES',
      displayUnit: "KG",
      factoryCurbWeight: 0,
      frontAxleLoadRestoration: "EXIT",
      frontAxleLoadRestorationPercent: 0,
      frontAxleLoadRestorationStatus: "INACTIVE",
      frontGrossAxleWeightRating: 0,
      grossCombinedWeightRating: 0,
      grossVehicleWeightRating: 0,
      maxBedTrailerWeight: 0,
      maxHitchTrailerWeight: 0,
      passengerWeight: 0,
      payload: 0,
      payloadPercent: 0,
      rearGrossAxleWeightRating: 0,
      screenMode: "SCALE_SCREEN_NOT_ACTIVE",
      screenModeStatus: "SCALE_SCREEN_NOT_ACTIVE",
      screenStep: 0,
      tailLightMode: "ACTIVATE_PAYLOAD_MODE",
      tailLightModeStatus: "NO_TAIL_LIGHT_ACTIVE",
      tare: 'YES',
      tareStatus: "NOREQUEST",
      taredPayload: 0,
      trailerTongueLoad: 0,
      trailerTongueLoadPercent: 0,
      trailerWeight: 0,
      trailerWeightStatus: 0,
    },

    TempObsshData : {},

    /**
     * @function init
     * @description Function for model initialization
     */
    init : function() {
      this.TempObsshData = SDL.deepCopy(this.ObsshData)
    },

    restoreAppliedSettings : function() {
      for(var key in this.ObsshData){
        this.set('TempObsshData.' + key, this.ObsshData[key]);
      }
    },
    /**
     * @function applySettings
     * @description Apply temporary variables for model and send a notification if the
     *       data change
     */
    applySettings: function() {
      var notification = {
          moduleType:'OBSSH',
          obsshControlData: {}
      };

      for (var key in this.TempObsshData) {
        if(this.TempObsshData[key] != this.ObsshData[key] && this.ObsshDataEnabled[key]) {
          this.ObsshData[key] = this.TempObsshData[key];
          if(typeof this.ObsshData[key] === 'boolean') {
            notification.ObsshControlData[key] = this.ObsshData[key] == this.CheckedValuesList[1];
            continue;
          }
          notification.obsshControlData[key] = this.ObsshData[key];
        }
      }
        
      if(Object.keys(notification.obsshControlData).length > 0) {
        FFW.RC.onInteriorVehicleDataNotification(notification);
      }
    },

    /** 
     * @function setData
     * @description Set data depending on data type. If data type is boolean
     *              return value is 'YES' or 'NO' depending on data value.
     *              In other case returns incoming data.
     */
    setData: function(data) {
      if(typeof data === 'boolean') {
        return data ? this.CheckedValuesList[1] : this.CheckedValuesList[0];
      } 
      return data;
    },

    /**
     * @function setObsshControlData
     * @desc update trailer check control data with new values
     */
    setObsshControlData: function(data) {
      var data_to_set = null;
      for (var key in data) {
        data_to_set = this.setData(data[key]);
        this.set("TempObsshData." + key, data_to_set);
        this.set("ObsshData." + key, data_to_set);
      }
    },

    /**
     * @function getObsshControlData
     * @desc returns current trailer check control data values
     */
    getObsshControlData: function() {
      var result = {};
      for(var key in this.ObsshData) {
        if(this.ObsshDataEnabled[key]) {
          result[key] = this.setData(this.ObsshData[key]);
        }
      }
      return result;
    },

    /**
     * @function generateObsshControlCapabilities
     * @desc generates trailer check control capabilities
     */
    generateObsshControlCapabilities: function() {
      
      var capabilities = {
        "moduleName": "obssh",
        "checkFlatSurfaceAvailable": true,
        "checkGearAvailable": true,
        "checkSteeringWheelAvailable": true,
        "checkTirePressureAvailable": true,
        "displayUnitAvailable": true,
        "factoryCurbWeightAvailable": true,
        "frontAxleLoadRestorationAvailable": true,
        "frontAxleLoadRestorationPercentAvailable": true,
        "frontAxleLoadRestorationStatusAvailable": true,
        "frontGrossAxleWeightRatingAvailable": true,
        "grossCombinedWeightRatingAvailable": true,
        "grossVehicleWeightRatingAvailable": true,
        "maxBedTrailerWeightAvailable": true,
        "maxHitchTrailerWeightAvailable": true,
        "passengerWeightAvailable": true,
        "payloadAvailable": true,
        "payloadPercentAvailable": true,
        "rearGrossAxleWeightRatingAvailable": true,
        "screenModeAvailable": true,
        "screenModeStatusAvailable": true,
        "screenStepAvailable": true,
        "tailLightModeAvailable": true,
        "tailLightModeStatusAvailable": true,
        "tareAvailable": true,
        "tareStatusAvailable": true,
        "taredPayloadAvailable": true,
        "trailerTongueLoadAvailable": true,
        "trailerTongueLoadPercentAvailable": true,
        "trailerWeightAvailable": true,
        "trailerWeightStatusAvailable": true,
      };
      SDL.remoteControlCapabilities.remoteControlCapability['obsshControlCapabilities'].push(capabilities);
    }
});
