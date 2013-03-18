function StarlingSpriteSheet(imgPath,xmlPath){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",xmlPath,false);
    xmlhttp.send();
    var xml=xmlhttp.responseXML;
    var tp=xml.getElementsByTagName("TextureAtlas");
    if (!tp) { console.log("TextureAtlas not found"); return null; }
    var textures = tp[0].getElementsByTagName("SubTexture");
    var images = {};
    var frames = [];
    if (textures.length==0) { console.log("No textures found."); return null; }
    var frmIndex = 0;
    for (var i=0;i<textures.length;i++){
        var t = textures[i];
        var x = t.getAttribute("x");
        var y = t.getAttribute("y");
        var w = t.getAttribute("width");
        var h = t.getAttribute("height");
        var name = t.getAttribute("name");
        frames.push([x,y,w,h]);
        images[name] = frmIndex;
        frmIndex += 1;
    }
    var animations = {};
    for (var name in images){
        if (name.indexOf('_')>0) {
            var base = name.substring(0,name.indexOf('_'));
            var index = name.substring(base.length+1);
            if (!animations.hasOwnProperty(base) && !isNaN(index)){
                var tmp_names = Object.keys(images).filter(function(el){ return el.indexOf(base)==0; });
                if (tmp_names.length>0){
                    var fr_anim = [];
                    for (var i=0;i<tmp_names.length;i++){ 
                        var n = tmp_names[i]; 
                        fr_anim.push(images[n]); }
                    if (fr_anim.length>0){ 
                        fr_anim.sort(function(a,b){return a-b});
                        animations[base] = { "frames": fr_anim };  }
                }
            }
        }
    }
    for (var prop in animations){ images[prop] = animations[prop]; }
    
    var data = { "frames" : frames, "animations": images, "images":[imgPath]};
    var ss = new createjs.SpriteSheet(data);
    return ss;
}