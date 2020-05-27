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
 * @name ObsshViewHelper 
 * @desc Obssh visual helper
 * @category View
 * @filesource app/view/settings/helpers/ObsshViewHelper.js
 * @version 1.0
 */

SDL.ObsshViewHelper = Em.Object.create({
    /**
     * @function ContainerView
     * @param {string} name, {Em.Object} data_control_unit, {Em.Checkbox} param_included_checkbox
     * @desc return Em.Container View that contains label, selection view/text field and checkbox
     *       The label contains text `name`.
     */
    ObsshContainerView: function(name, data_control_unit, param_included_checkbox) {
        return Em.ContainerView.create({
                elementId: "ObsshContainerView",
                classNames: [
                    'ObsshContainerView'
                ],
                childViews: [
                    'ObsshContainerViewParamIncludedCheckBox',
                    'ObsshContainerViewLabel',
                    'ObsshContainerViewDataControlUnit'
                ],

                ObsshContainerViewParamIncludedCheckBox: param_included_checkbox.extend({
                  classNames: 'ObsshContainerViewParamIncludedCheckBox'
                }),
                ObsshContainerViewLabel: SDL.Label.extend({
                    classNames: 'ObsshContainerViewLabel',
                    content: name
                }),
                ObsshContainerViewDataControlUnit: data_control_unit.extend({
                    classNames: 'ObsshContainerViewDataControlUnit',
                })
        });
    },
})
