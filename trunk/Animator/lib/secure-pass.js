Ext.namespace('Ext.ux');

Ext.ux.SecurePass = function(config) {
    Ext.ux.SecurePass.superclass.constructor.call(this, config);
}
 
Ext.extend(Ext.ux.SecurePass, Ext.form.TextField, {
    /**
     * @cfg {String/Object} errors A Error spec, or true for a default spec (defaults to
     * {
     *  PwdEmpty: "Please type a password, and then retype it to confirm.",
     *  PwdDifRPwd: "The new password and the confirmation password don't match. Please type the same password in both boxes.",
     *  PwdShort: "Your password must be at least 6 characters long. Please type a different password.",
     *  PwdLong: "Your password can't contain more than 16 characters. Please type a different password.",
     *  PwdBadChar: "The password contains characters that aren't allowed. Please type a different password.",
     *  IDInPwd: "Your password can't include the part of your ID. Please type a different password.",
     *  FNInPwd: "Your password can't contain your first name. Please type a different password.",
     *  LNInPwd: "Your password can't contain your last name. Please type a different password."
     * })
     */
    // private
    errors : {
        PwdEmpty: "Please type a password, and then retype it to confirm.",
        PwdDifRPwd: "The new password and the confirmation password don't match. Please type the same password in both boxes.",
        PwdShort: "Your password must be at least 3 characters long. Please type a different password.",
        PwdLong: "Your password can't contain more than 16 characters. Please type a different password.",
        PwdBadChar: "The password contains characters that aren't allowed. Please type a different password.",
        IDInPwd: "Your password can't include the part of your ID. Please type a different password.",
        FNInPwd: "Your password can't contain your first name. Please type a different password.",
        LNInPwd: "Your password can't contain your last name. Please type a different password."
    },
 
    /**
     * @cfg {String/Object} Label for the strength meter (defaults to
     * 'Password strength:')
     */
    // private
    meterLabel : '',
 
    /**
     * @cfg {String/Object} pwdStrengths A pwdStrengths spec, or true for a default spec (defaults to
     * ['Weak', 'Medium', 'Strong'])
     */
    // private
    pwdStrengths : ['Weak', 'Medium', 'Strong'],
 
    // private
    strength : 0,
 
    // private
    _lastPwd : null,
 
    // private
    kCapitalLetter : 0,
    kSmallLetter : 1,
    kDigit : 2,
    kPunctuation : 3,
 
    // private
    initEvents : function(){
        Ext.ux.SecurePass.superclass.initEvents.call(this);
        this.el.on('keyup', this.checkStrength,  this, {buffer:50});
    },
 
    // private
    onRender : function(ct, position){
        Ext.ux.SecurePass.superclass.onRender.call(this, ct, position);
        this.wrap = this.el.wrap({cls: "x-form-field-wrap"});
        this.trigger = this.wrap.createChild({tag: "div", cls: "StrengthMeter "+this.triggerClass});
        if(this.meterLabel != ''){
            this.trigger.createChild({tag: "label", html: this.meterLabel});
        }
        this.trigger.createChild({tag: "div", cls: "PwdMeterBase", html: '<div class="PwdBack"><div class="PwdMeter" id="PwdMeter"></div></div>'});
        if(this.hideTrigger){
            this.trigger.setDisplayed(false);
        }
        this.setSize(this.width||'', this.height||'');
    },
 
    // private
    onDestroy : function(){
        if(this.trigger){
            this.trigger.removeAllListeners();
            this.trigger.remove();
        }
        if(this.wrap){
            this.wrap.remove();
        }
        Ext.form.TriggerField.superclass.onDestroy.call(this);
    },
 
    // private
    checkStrength : function(){
        var pwd = this.el.getValue();
        if (pwd == this._lastPwd) {
            return;
        }
 
        var strength;
        if (this.ClientSideStrongPassword(pwd)) {
            strength = 3;
        } else if(this.ClientSideMediumPassword(pwd)) {
            strength = 2;
        } else if(this.ClientSideWeakPassword(pwd)) {
            strength = 1;
        } else {
            strength = 0;
        }
 
        document.getElementById('PwdMeter').style.width = 40 * strength +'px';
        if(this.pwdStrengths != null && strength > 0) {
            document.getElementById('PwdMeter').innerHTML = '&nbsp;'+ this.pwdStrengths[strength - 1];
        } else {
            document.getElementById('PwdMeter').innerHTML = '';
        }
 
        this._lastPwd = pwd;
    },
 
    // private
    validateValue : function(value){
        if(!Ext.form.NumberField.superclass.validateValue.call(this, value)){
            return false;
        }
        if(value.length < 1){ // if it's blank and textfield didn't flag it then it's valid
             return true;
        }
        if(value.length == 0) {
            this.markInvalid(this.errors.PwdEmpty);
            return false;
        }
        if("[\x21-\x7e]*".match(value)) {
            this.markInvalid(this.errors.PwdBadChar);
            return false;
        }
        if(value.length < 3) {
            this.markInvalid(this.errors.PwdShort);
            return false;
        }
        if(value.length > 16) {
            this.markInvalid(this.errors.PwdLong);
            return false;
        }
        /*if(value.length > 0 && this.iRPwd != 'undefined' && Ext.get(this.iRPwd) != null && value != Ext.get(this.iRPwd).getValue()) {
            this.markInvalid(this.errors.PwdDifRPwd);
            return false;
        }*/
        return true;
    },
 
    // private
    CharacterSetChecks : function(type){
        this.type = type;
        this.fResult = false;
    },
 
    // private
    isctype : function(character, type){
        switch (type) { //why needed break after return in js ? very odd bug
            case this.kCapitalLetter: if (character >= 'A' && character <= 'Z') { return true; } break;
            case this.kSmallLetter: if (character >= 'a' && character <= 'z') { return true; } break;
            case this.kDigit: if (character >= '0' && character <= '9') { return true; } break;
            case this.kPunctuation: if ("!@#$%^&*()_+-='\";:[{]}|.>,</?`~".indexOf(character) >= 0) { return true; } break;
            default: return false;
        }
    },
 
    // private
    IsLongEnough : function(pwd, size){
        return !(pwd == null || isNaN(size) || pwd.length < size);
    },
 
    // private
    SpansEnoughCharacterSets : function(word, nb){
        if (!this.IsLongEnough(word, nb))
        {
            return false;
        }
 
        var characterSetChecks = new Array(
            new this.CharacterSetChecks(this.kCapitalLetter), new this.CharacterSetChecks(this.kSmallLetter),
            new this.CharacterSetChecks(this.kDigit), new this.CharacterSetChecks(this.kPunctuation));
        for (var index = 0; index < word.length; ++index) {
            for (var nCharSet = 0; nCharSet < characterSetChecks.length; ++nCharSet) {
                if (!characterSetChecks[nCharSet].fResult && this.isctype(word.charAt(index), characterSetChecks[nCharSet].type)) {
                    characterSetChecks[nCharSet].fResult = true;
                    break;
                }
            }
        }
 
        var nCharSets = 0;
        for (var nCharSet = 0; nCharSet < characterSetChecks.length; ++nCharSet) {
            if (characterSetChecks[nCharSet].fResult) {
                ++nCharSets;
            }
        }
 
        if (nCharSets < nb) {
            return false;
        }
        return true;
    },
 
    // private
    ClientSideStrongPassword : function(pwd){
        return this.IsLongEnough(pwd, 8) && this.SpansEnoughCharacterSets(pwd, 3);
    },
 
    // private
    ClientSideMediumPassword : function(pwd){
        return this.IsLongEnough(pwd, 7) && this.SpansEnoughCharacterSets(pwd, 2);
    },
 
    // private
    ClientSideWeakPassword : function(pwd){
        return this.IsLongEnough(pwd, 6) || !this.IsLongEnough(pwd, 0);
    }
})