enchant();

window.onload=function(){
	game = new Game(320,320);
	game.onload=function(){
		game.rootScene.backgroundColor="#000000";
        game.fps = 30;

        var e = new Sprite(150,150);
        e.backgroundColor = "yellow";
        e.x = 30;
        e.y = 30;

        var a = new Sprite(50,50);
        a.backgroundColor = "red";
        a.x = 50;
        a.y = 50;

        var b = new Sprite(50,50);
        b.backgroundColor = "pink";
        b.x = 110;
        b.y = 50;

        var c = new Sprite(50,50);
        c.backgroundColor = "blue";
        c.x = 50;
        c.y = 110;

        var d = new Sprite(50,50);
        d.backgroundColor = "white";
        d.x = 110;
        d.y = 110;

        var relation = RelationGroup();
        relation.addChild(e);
        relation.addChild(a);
        relation.addChild(b);
        relation.addChild(c);
        relation.addChild(d);

        game.rootScene.addChild(relation);
	}

	game.debug();
}



var RelationGroup = enchant.Class.create(enchant.Group, {
    initialize: function () {
        enchant.Group.call(this);
        this._width = 0;
        this._height = 0;
        this._center_x = 0;
        this._center_y = 0;
        this._rect = [NaN, NaN, NaN, NaN];
    },
    addChild: function(node) {
        enchant.Group.prototype.addChild.call(this, node);
        x1 = node.x;
        y1 = node.y;
        x2 = x1 + node.width;
        y2 = y1 + node.height;
        if (isNaN(this._rect[0]) || this._rect[0] > x1) this._rect[0] = x1;
        if (isNaN(this._rect[1]) || this._rect[1] > y1) this._rect[1] = y1;
        if (isNaN(this._rect[2]) || this._rect[2] < x2) this._rect[2] = x2;
        if (isNaN(this._rect[3]) || this._rect[3] < y2) this._rect[3] = y2;
    },
    removeChild: function(node) {
        enchant.Group.prototype.removeChild.call(this, node);
        this._rect = [NaN, NaN, NaN, NaN];
        for (var i=0; i<this.childNodes.length; i++)
        {
            node = this.childNodes[i];
            x1 = node.x;
            y1 = node.y;
            x2 = x1 + node.width;
            y2 = y1 + node.height;
            if (isNaN(this._rect[0]) || this._rect[0] > x1) this._rect[0] = x1;
            if (isNaN(this._rect[1]) || this._rect[1] > y1) this._rect[1] = y1;
            if (isNaN(this._rect[2]) || this._rect[2] < x2) this._rect[2] = x2;
            if (isNaN(this._rect[3]) || this._rect[3] < y2) this._rect[3] = y2;
        }
    },
    zoom: function(ratio, time, easing) {
        for (var i=0; i<this.childNodes.length; i++)
        {
            var node = this.childNodes[i];
// console.dir(node);
            node.tl.scaleTo(ratio, ratio);
            // new_x = null;
            // if (node.x < this.center_x)
            //     new_x = (this.center_x - node.x)*ratio;
            // else
            //     new_x = (this.center_x - node.x)*ratio;
console.log("=x==============");
console.log(this.center_x);
console.log(node.x);
console.log(ratio);
console.log((node.x - this.center_x)*ratio);
console.log("=y==============");
console.log(this.center_y);
console.log(node.y);
console.log(ratio);
console.log((node.y - this.center_y)*ratio);

            node.tl.moveBy((node.x - this.center_x)*ratio, (node.y - this.center_y)*ratio)

            // break;
        }
    },
    width: {
      get: function() {
        return this._rect[2] - this._rect[0];
      }
    },
    height: {
      get: function() {
        return this._rect[3] - this._rect[1];
      }
    },
    center_x: {
      get: function() {
        return this._rect[0] + (this.width / 2);
      }
    },
    center_y: {
      get: function() {
        return this._rect[1] + (this.height / 2);
      }
    }
});
