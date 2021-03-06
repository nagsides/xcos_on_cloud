function COSBLK_f() {
    COSBLK_f.prototype.get = function COSBLK_f() {
        alert("parameters can not be changed")
    }

    COSBLK_f.prototype.define = function COSBLK_f() {
        this.in1 = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["cosblk"]);
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"COSBLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    COSBLK_f.prototype.details = function COSBLK_f() {
        return this.x;
    }

    COSBLK_f.prototype.get_popup_title = function COSBLK_f() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    COSBLK_f.prototype.getDimensionForDisplay = function COSBLK_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
