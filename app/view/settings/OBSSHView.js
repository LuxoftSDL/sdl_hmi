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
 * @name SDL.ObsshView
 * @desc Helps user to specify and send OBSSH-data on SDL.
 *       Also shows updated data values that come from SDL.
 * @category View
 * @filesource app/view/settings/ObsshView.js
 * @version 1.0
 */

SDL.ObsshView = Em.ContainerView.create({
    elementId: 'obssh',
    classNames: 'in_obssh_view',

    classNameBindings: [
        'SDL.States.settings.obssh.active:active_state:inactive_state'
    ],

    childViews: [
        'set',
        "checkFlatSurface",
        "checkGear",
        "checkSteeringWheel",
        "checkTirePressure",
        "tare",
        "displayUnit",
        "frontAxleLoadRestoration",
        "frontAxleLoadRestorationStatus",
        "screenMode",
        "screenModeStatus",
        "tailLightMode",
        "tailLightModeStatus",
        "tareStatus",
        "factoryCurbWeight",
        "frontAxleLoadRestorationPercent",
        "frontGrossAxleWeightRating",
        "grossCombinedWeightRating",
        "grossVehicleWeightRating",
        "maxBedTrailerWeight",
        "maxHitchTrailerWeight",
        "passengerWeight",
        "payload",
        "payloadPercent",
        "rearGrossAxleWeightRating",
        "screenStep",
        "taredPayload",
        "trailerTongueLoad",
        "trailerTongueLoadPercent",
        "trailerWeight",
        "trailerWeightStatus"
    ],
    
    set: SDL.Button.create({
        classNames: [
          'setButton'
        ],

        text: 'Send notification',
        onDown: false,
        model: 'currentObsshModel',
        method: 'applySettings',
        target: 'SDL.RCModulesController',
        action: 'action'
    }),

    checkFlatSurface: SDL.ObsshViewHelper.ObsshContainerView(
      "checkFlatSurface",
      Em.Select.extend({
        contentBinding: 'SDL.RCModulesController.currentObsshModel.CheckedValuesList',
        valueBinding: 'SDL.RCModulesController.currentObsshModel.TempObsshData.checkFlatSurface' }),
      Em.Checkbox.extend({
        checkedBinding: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.checkFlatSurface' })),

    checkGear: SDL.ObsshViewHelper.ObsshContainerView(
      "checkGear",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.CheckedValuesList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.checkGear" }),
      Em.Checkbox.extend({
        checkedBinding: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.checkGear'
      })),

    checkSteeringWheel: SDL.ObsshViewHelper.ObsshContainerView(
      "checkSteeringWheel",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.CheckedValuesList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.checkSteeringWheel" }),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.TempObsshData.checkSteeringWheel'
      })),

    checkTirePressure: SDL.ObsshViewHelper.ObsshContainerView(
      "checkTirePressure",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.CheckedValuesList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.checkTirePressure" }),
      Em.Checkbox.extend({
        checked: 'SDL.RC.current.Obssh.checkTirePressure'
      })),

    tare: SDL.ObsshViewHelper.ObsshContainerView(
      "tare",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.CheckedValuesList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.tare" }),
      Em.Checkbox.extend({
        checkedBinding: 'SDL.RC.currentObsshModel.ObsshDataEnabled.tare'
      })),

    displayUnit: SDL.ObsshViewHelper.ObsshContainerView(
      "displayUnit",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.ObsshDisplayUnitList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.displayUnit" }),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.displayUnit'
      })),

    frontAxleLoadRestoration: SDL.ObsshViewHelper.ObsshContainerView(
      "frontAxleLoadRestoration",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.FrontAxleLoadRestorationList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.frontAxleLoadRestoration" }),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.frontAxleLoadRestoration'
      })),

    frontAxleLoadRestorationStatus: SDL.ObsshViewHelper.ObsshContainerView(
      "frontAxleLoadRestorationStatus",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.FrontAxleLoadRestorationStatusList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.frontAxleLoadRestorationStatus" }),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.frontAxleLoadRestorationStatus'
      })),

    screenMode: SDL.ObsshViewHelper.ObsshContainerView(
      "screenMode",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.ScreenModeList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.screenMode" }),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.screenMode'
      })),

    screenModeStatus: SDL.ObsshViewHelper.ObsshContainerView(
      "screenModeStatus",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.ScreenModeList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.screenModeStatus" }),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.screenModeStatus'
      })),

    tailLightMode: SDL.ObsshViewHelper.ObsshContainerView(
      "tailLightMode",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.TailLightModeList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.tailLightMode" }),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.tailLightMode'
      })),

    tailLightModeStatus: SDL.ObsshViewHelper.ObsshContainerView(
      "tailLightModeStatus",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.TailLightModeStatusList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.tailLightModeStatus" }),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.tailLightModeStatus'
      })),

    tareStatus: SDL.ObsshViewHelper.ObsshContainerView(
      "tareStatus",
      Em.Select.extend({
        contentBinding: "SDL.RCModulesController.currentObsshModel.TareStatusList",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.tareStatus" }),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.tareStatus'
      })),


    factoryCurbWeight: SDL.ObsshViewHelper.ObsshContainerView(
      "factoryCurbWeight",
      Em.TextField.extend({
        elementId: "factoryCurbWeight",
        classNames: "factoryCurbWeight",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.factoryCurbWeight"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.factoryCurbWeight'
      })),

    frontAxleLoadRestorationPercent: SDL.ObsshViewHelper.ObsshContainerView(
      "frontAxleLoadRestorationPercent",
      Em.TextField.extend({
        elementId: "frontAxleLoadRestorationPercent",
        classNames: "frontAxleLoadRestorationPercent",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.frontAxleLoadRestorationPercent"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.frontAxleLoadRestorationPercent'
      })),

    frontGrossAxleWeightRating: SDL.ObsshViewHelper.ObsshContainerView(
      "frontGrossAxleWeightRating",
      Em.TextField.extend({
        elementId: "frontGrossAxleWeightRating",
        classNames: "frontGrossAxleWeightRating",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.frontGrossAxleWeightRating"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.frontGrossAxleWeightRating'
      })),

    grossCombinedWeightRating: SDL.ObsshViewHelper.ObsshContainerView(
      "grossCombinedWeightRating",
      Em.TextField.extend({
        elementId: "grossCombinedWeightRating",
        classNames: "grossCombinedWeightRating",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.grossCombinedWeightRating"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.grossCombinedWeightRating'
      })),

    grossVehicleWeightRating: SDL.ObsshViewHelper.ObsshContainerView(
      "grossVehicleWeightRating",
      Em.TextField.extend({
        elementId: "grossVehicleWeightRating",
        classNames: "grossVehicleWeightRating",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.grossVehicleWeightRating"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.grossVehicleWeightRating'
      })),

    maxBedTrailerWeight: SDL.ObsshViewHelper.ObsshContainerView(
      "maxBedTrailerWeight",
      Em.TextField.extend({
        elementId: "maxBedTrailerWeight",
        classNames: "maxBedTrailerWeight",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.maxBedTrailerWeight"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.maxBedTrailerWeight'
      })),

    maxHitchTrailerWeight: SDL.ObsshViewHelper.ObsshContainerView(
      "maxHitchTrailerWeight",
      Em.TextField.extend({
        elementId: "maxHitchTrailerWeight",
        classNames: "maxHitchTrailerWeight",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.maxHitchTrailerWeight"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.maxHitchTrailerWeight'
      })),

    passengerWeight: SDL.ObsshViewHelper.ObsshContainerView(
      "passengerWeight",
      Em.TextField.extend({
        elementId: "passengerWeight",
        classNames: "passengerWeight",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.passengerWeight"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.passengerWeight'
      })),

    payload: SDL.ObsshViewHelper.ObsshContainerView(
      "payload",
      Em.TextField.extend({
        elementId: "payload",
        classNames: "payload",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.payload"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.payload'
      })),

    payloadPercent: SDL.ObsshViewHelper.ObsshContainerView(
      "payloadPercent",
      Em.TextField.extend({
        elementId: "payloadPercent",
        classNames: "payloadPercent",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.payloadPercent"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.payloadPercent'
      })),

    rearGrossAxleWeightRating: SDL.ObsshViewHelper.ObsshContainerView(
      "rearGrossAxleWeightRating",
      Em.TextField.extend({
        elementId: "rearGrossAxleWeightRating",
        classNames: "rearGrossAxleWeightRating",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.rearGrossAxleWeightRating"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.rearGrossAxleWeightRating'
      })),

    screenStep: SDL.ObsshViewHelper.ObsshContainerView(
      "screenStep",
      Em.TextField.extend({
        elementId: "screenStep",
        classNames: "screenStep",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.screenStep"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.screenStep'
      })),

    taredPayload: SDL.ObsshViewHelper.ObsshContainerView(
      "taredPayload",
      Em.TextField.extend({
        elementId: "taredPayload",
        classNames: "taredPayload",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.taredPayload"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.taredPayload'
      })),

    trailerTongueLoad: SDL.ObsshViewHelper.ObsshContainerView(
      "trailerTongueLoad",
      Em.TextField.extend({
        elementId: "trailerTongueLoad",
        classNames: "trailerTongueLoad",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.trailerTongueLoad"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.trailerTongueLoad'
      })),

    trailerTongueLoadPercent: SDL.ObsshViewHelper.ObsshContainerView(
      "trailerTongueLoadPercent",
      Em.TextField.extend({
        elementId: "trailerTongueLoadPercent",
        classNames: "trailerTongueLoadPercent",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.trailerTongueLoadPercent"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.trailerTongueLoadPercent'
      })),

    trailerWeight: SDL.ObsshViewHelper.ObsshContainerView(
      "trailerWeight",
      Em.TextField.extend({
        elementId: "trailerWeight",
        classNames: "trailerWeight",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.trailerWeight"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.trailerWeight'
      })),

    trailerWeightStatus: SDL.ObsshViewHelper.ObsshContainerView(
      "trailerWeightStatus",
      Em.TextField.extend({
        elementId: "trailerWeightStatus",
        classNames: "trailerWeightStatus",
        type: "integer",
        valueBinding: "SDL.RCModulesController.currentObsshModel.TempObsshData.trailerWeightStatus"}),
      Em.Checkbox.extend({
        checked: 'SDL.RCModulesController.currentObsshModel.ObsshDataEnabled.trailerWeightStatus'
      }))
})
