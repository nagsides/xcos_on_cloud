function AFFICH_m() {

    AFFICH_m.prototype.define = function AFFICH_m() {
        this.herit = 0;
        this.font = 1;
        this.fontsize = 1;
        this.colr = 1;
        this.nt = 5;
        this.nd = 1;
        this.in = [[1],[1]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["affich2"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in[0]]);
        model.in2 = new ScilabDouble([this.in[1]]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([-1], [0], [0], [1], [1], [0], ...zeros(this.in[0] * this.in[1], 1));
        model.ipar = new ScilabDouble([this.font], [this.fontsize], [this.colr], [1000], [this.nt], [this.nd], [this.in[0]]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);
        model.label = new ScilabString([""]);
        var exprs = new ScilabString([sci2exp([parseFloat(...getData(model.in)), parseFloat(...getData(model.in2))])], [this.font], [this.fontsize], [this.colr], [this.nt], [this.nd], [0]);
        var n = 0;
        this.displayParameter = [this.displayParameter];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"AFFICH_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        this.x.graphics.style = new ScilabString(["AFFICH_m"]);
        return new AfficheBlock(this.x);
    }
    AFFICH_m.prototype.get = function AFFICH_m() {
        if(this.in == undefined || this.in == null){
            this.in = "[1,1]";
        }
        var options={
            in:["Input Size",this.in],
            font:["Font number",this.font],
            fontsize:["Font size",this.fontsize],
            colr:["Color",this.colr],
            nt:["Total number of digits",this.nt],
            nd:["Number of rational part digits",this.nd],
            herit:["Block inherits (1) or not (0)",this.herit],
        }
        return options;
    }
    AFFICH_m.prototype.set = function AFFICH_m() {
        var temp_in = arguments[0]["in"];
        this.font = parseFloat(arguments[0]["font"]);
        this.fontsize = parseFloat(arguments[0]["fontsize"]);
        this.colr = parseFloat(arguments[0]["colr"]);
        this.nt = parseFloat(arguments[0]["nt"]);
        this.nd = parseFloat(arguments[0]["nd"]);
        this.herit = parseFloat(arguments[0]["herit"]);
        var in_1 = inverse(temp_in);
        if(temp_in.includes(";") || in_1.length > 2 || in_1[0].length > 1 || in_1[1].length > 1 ){
            alert("Answer given for Input Size\nhas invalid dimension:\nwaiting for dimension 1 x 2");
            throw "incorrect";
        }

        if(this.font <= 0){
            alert("Font number must be positive");
            throw "incorrect";
        }
        if(this.fontsize <= 0){
            alert("Font size must be positive");
            throw "incorrect";
        }
        if(this.nt <= 3){
            alert("Total number of digits must be greater than 3");
            throw "incorrect";
        }
        if(this.nd < 0){
            alert("Number of rational part digits must be greater or equal 0");
            throw "incorrect";
        }
        if(this.herit != 0 && this.herit != 1){
            alert("Accept inherited values are 0 and 1");
            throw "incorrect";
        }
        this.in = temp_in;
        this.displayParameter =[this.displayParameter];
        this.x.model.intyp = new ScilabDouble([1]);
        var io = set_io(this.x.model,this.x.graphics,in_1,[],ones(1-this.herit,1),[]);
        this.x.model.ipar = new ScilabDouble([this.font],[this.fontsize],[this.colr],[1000],[this.nt],[this.nd],in_1[0]);
        this.x.model.dstate = new ScilabDouble([-1],[0],[0],[1],[1],[0],zeros(in_1[0]*in_1[1],1));
        this.x.model.evtin = new ScilabDouble(...ones(1-this.herit,1));
        var exprs = new ScilabString([this.in], [this.font], [this.fontsize], [this.colr], [this.nt], [this.nd], [this.herit]);
        this.x.graphics.exprs = exprs;
        return new AfficheBlock(this.x);
    }
    AFFICH_m.prototype.details = function AFFICH_m() {
        return this.x;
    }
    AFFICH_m.prototype.setLabel = function AFFICH_m(SetIDForLabel) {
        this.displayParameter = SetIDForLabel;
    }
    AFFICH_m.prototype.get_popup_title = function AFFICH_m() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title
    }
    AFFICH_m.prototype.getDimensionForDisplay = function AFFICH_m(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
