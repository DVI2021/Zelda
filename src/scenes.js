function loadScenes(Q){
    Q.scene('blackScreen', function(stage){
        var container = stage.insert(new Q.UI.Container({
            x: Q.width/2, y: Q.height/2, fill: "black"
        }));

        var labelAttack = container.insert(new Q.UI.Text({
            x:0, y: -80, label: "Press s to drop a bomb.", color:"white"
        }));

        var labelBombs = container.insert(new Q.UI.Text({
            x:0, y: -40, label: "Press spacebar or Z to attack.", color:"white"
        }));
		
		var labelHelmet = container.insert(new Q.UI.Text({
            x:0, y: -120, label: "Press C to turn on and turn off the helmet.", color:"white"
        }));
		
		var labelRupia = container.insert(new Q.UI.Text({
            x:0, y: -160, label: "Press D to drop a rupee.", color:"white"
        }));

        var labelBegin = container.insert(new Q.UI.Text({
            x:0, y: 0, label: "Press enter to begin.", color:"white"
        }));

        Q.input.on("confirm",this,function() {
            Q.clearStages();
            Q.stageScene('mainTitle', 1);
            Q.input.off("confirm",this);
        });
    });

    Q.scene('mainTitle', function(stage){
        var container = stage.insert(new Q.UI.Container({
            x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
        }));
        var button = container.insert(new Q.UI.Button({
            x: 0, y: 0, fill: "#CCCCCC", asset: "title-screen.png", with:"50%", height:"50%"
        }));

        Q.audio.play("title.mp3");

        Q.input.on("confirm",this,function() {
            Q.audio.stop("title.mp3");
            Q.clearStages();
            Q.stageScene('level1', 1);
            Q.stageScene('hud', 3);
			Q.stageScene('hudSkill', 4);
            Q.input.off("confirm",this);
        });

        container.fit(20);
    });
	
	Q.scene('background', function(stage){
        var container = stage.insert(new Q.UI.Container({
            x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
        }));
        var button = container.insert(new Q.UI.Button({
            x: 0, y: 0, fill: "#CCCCCC", asset: stage.options.image, with:"50%", height:"50%"
        }));

        container.fit(20);
    });
	
	Q.scene('nextLevel', function(stage){
		Q.audio.stop();
		Q.clearStages();

        var level = "level" + (Q.state.get("currentLevel")+1);

        Q.stageScene('hudSkill', 4);
		Q.stageScene(level, 1);
        Q.stageScene('hud', 3);
	});

    Q.scene('Credits', function(stage) {
        Q.audio.play("credits-music.mp3", {loop:true});

        const posY = -200;

        var container = stage.insert(new Q.UI.Container({
            x: Q.width/2, y: Q.height/2, fill: "black"
        }));

        var creditos = container.insert(new Q.UI.Text({
            x:0, y: posY, label: "Créditos", color:"white"
        }));

        var creadores = container.insert(new Q.UI.Text({
            x:0, y: posY + 40, label: "Creado por Francisco García y Rubén Simao", color:"white"
        }));

        var referencias = container.insert(new Q.UI.Text({
            x:0, y: posY + 40*2, label: "Referencias", color:"white"
        }));

        var juegos = container.insert(new Q.UI.Text({
            x:0, y: posY + 40*3, label: "Basado en los juegos\n Link: The faces of evil y Zelda: the wand of Gamelon", color:"white"
        }));

        var musica = container.insert(new Q.UI.Text({
            x:0, y: posY + 40*5, label: "Música y sonidos de la saga The legend of Zelda", color:"white"
        }));

        var tileset = container.insert(new Q.UI.Text({
            x:0, y: posY + 40*6, label: "TileSet de\n Super Mario All-Stars: Super Mario Bros. & The Lost Levels", color:"white"
        }));

        var background = container.insert(new Q.UI.Text({
            x:0, y: posY + 40*8, label: "Backgrounds de Terraria (primer nivel) y de\n Super Mario All-Stars: Super Mario Bros. & The Lost Levels\n(segundo nivel)", color:"white"
        }));		

        Q.input.on("confirm",this,function() {
            Q.audio.stop();
            Q.clearStages();
            Q.stageScene('blackScreen', 1);
            Q.input.off("confirm",this);
        });
    });

    Q.scene('GameOver',function(stage) {
        var container = stage.insert(new Q.UI.Container({
            x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
        }));
        var button = container.insert(new Q.UI.Button({
            x: 10, y: 0, fill: "#CCCCCC", label: "Play Again"
        }));
        var label = container.insert(new Q.UI.Text({
            x:10, y: -10 - button.p.h, label: stage.options.label
        }));
        
        button.on("click",function() {
            Q.clearStages();
            Q.audio.stop();
            Q.stageScene('Credits');
        });
        Q.input.on("confirm",this,function() {
            Q.clearStages();
            Q.audio.stop();
            Q.stageScene('Credits');
            Q.input.off("confirm",this);
        });

        Q.audio.stop();

        if(stage.options.win){
            Q.audio.play("WinGame.mp3");
        } else{
            Q.audio.play("GameOver.mp3");
            Q.audio.play("link-dead.mp3");
        }
        

        container.fit(20);
    });

    Q.scene("hud", function(stage){
		var container = stage.insert(new Q.UI.Container({
            x: 120, y: 50, w: 175, h: 90, fill: "rgba(125,125,125,0.3)"//"#7D7D7D"
        }));
		if(Q.state.get("maxHealth") > 4){
			container.p.w += 40*(Q.state.get("maxHealth")-4);
		}

        label_keys = new Q.UI.Text({x:Q.width/12 + 35, y:60, label: "" + Q.state.get("keys")});
        stage.insert(new Q.UI.Button({x:Q.width/11 - 1, y:70, sheet:"key", frame:0, scale:2.5}));
        stage.insert(label_keys);

        label_bombs = new Q.UI.Text({x:Q.width/5 + 40, y:60, label: "" + Q.state.get("bombs")});
        stage.insert(new Q.UI.Button({x:Q.width/5 - 1, y:70, asset: "bomb.png", scale:2.5}));
        stage.insert(label_bombs);

        for(let i = 0; i < (Q.state.get("health")-(Q.state.get("health") % 1)); i++){
            heart = new Q.UI.Button({x:Q.width/13 + i*40, y:25, asset: "heart.png", scale:2.5});
            stage.insert(heart);
        }
		
		if(Q.state.get("health") > 0 && (Q.state.get("health") % 1) != 0){
			let i = (Q.state.get("health")-0.5)/1;
			semiHeart = new Q.UI.Button({x:Q.width/13 + i*40, y:25, asset: "semiHeart.png", scale:2.5});
            stage.insert(semiHeart);
		}

        for(let j = 0; j < (Q.state.get("maxHealth") - (Q.state.get("health") + Q.state.get("health") % 1)); j++){
            stage.insert(new Q.UI.Button({x:Q.width/13 + (stage.items.length - 5)*40, y:25, asset: "emptyHeart.png", scale:2.5}));
        }

        Q.state.on("change.keys", this, function(){
            label_keys.p.label = "" + Q.state.get("keys");
        });

        Q.state.on("change.bombs", this, function(){
            label_bombs.p.label = "" + Q.state.get("bombs");
        });
        
        Q.state.on("change.maxHealth", this, function(){
			if(Q.state.get("maxHealth") > 4)
				container.p.w = 170 + 40*(Q.state.get("maxHealth")-4);;
        });

        Q.state.on("change.health", this, function(){
            const health = Q.state.get("health"), maxHealth = Q.state.get("maxHealth");
            
            if(health == 1){
                Q.audio.play("lowHealth.mp3", {loop:true});
            } else{
                Q.audio.stop("lowHealth.mp3");
            }

            stage.items.splice(5);

            for(let i = 0; i < (health - health % 1); i++){
                stage.insert(new Q.UI.Button({x:Q.width/13 + (stage.items.length - 5)*40, y:25, asset: "heart.png", scale:2.5}));
            }
			
			if(health > 0 && (health % 1) != 0){
				let k = (Q.state.get("health")-0.5)/1;
				stage.insert(new Q.UI.Button({x:Q.width/13 + k*40, y:25, asset: "semiHeart.png", scale:2.5}));
			}

            for(let j = 0; j < (maxHealth - (health + health % 1)); j++){
                stage.insert(new Q.UI.Button({x:Q.width/13 + (stage.items.length - 5)*40, y:25, asset: "emptyHeart.png", scale:2.5}));
            }
        });
		
		container.fit(20);
        
    });
	
	Q.scene("hudSkill", function(stage){
		var firstRupee = false;
		button_shield = new Q.UI.Button({x:Q.width-20, y:20, asset: "shield.png", width:1.2});opacity: 0.5
		button_helmet = new Q.UI.Button({x:Q.width-20, y:50, asset: "helmet.png", scale:1.2});
		button_rupees = new Q.UI.Button({x:Q.width-20, y:80, asset: "rupee.png", scale:1.2});
		label_rupees = new Q.UI.Text({x:Q.width-20, y:70, label: "" + Q.state.get("rupees"), color: "orange", outlineColor: "black", scale: 0.8});
		button_gauntlet = new Q.UI.Button({x:Q.width-20, y:110, asset: "gauntlet.png", scale:1});
		button_water = new Q.UI.Button({x:Q.width-18, y:140, asset: "water.png", scale:1});
		
		Q.state.on("change.currentLevel",this,function(){
			if(Q.state.get("shield")) stage.insert(button_shield);
			if(Q.state.get("helmet")) stage.insert(button_helmet);
			if(Q.state.get("activeHelmet"))	button_helmet.p.opacity = 1;
			if(Q.state.get("rupees") > 0){
				stage.insert(button_rupees);
				stage.insert(label_rupees);
				firstRupee = true;
				label_rupees.p.label = "" + Q.state.get("rupees");
			}
			if(Q.state.get("gauntlet"))	stage.insert(button_gauntlet);
			if(Q.state.get("water")) stage.insert(button_water);
			
			if(Q.state.get("currentLevel") == 3)
				stage.insert(new Q.Notification({x:Q.width/2, y:105, label: "Puede que pases calor, habría estado bien conseguir un poco de agua" , color: "orange", outlineColor: "white", scale: 0.6}));
		})
		
		Q.state.on("change.shield",this,function(){
			if(Q.state.get("shield"))
				stage.insert(button_shield);
			else
				stage.remove(button_shield);
		})
		
		Q.state.on("change.helmet",this,function(){
			if(Q.state.get("helmet"))
				stage.insert(button_helmet);
			else
				stage.remove(button_helmet);
		})
		Q.state.on("change.activeHelmet",this,function(){
			if(Q.state.get("activeHelmet"))
				button_helmet.p.opacity = 1;
			else
				button_helmet.p.opacity = 0.5;
		})
		
		Q.state.on("change.rupees",this,function(){
			if(!firstRupee){
				stage.insert(button_rupees);
				stage.insert(label_rupees);
				firstRupee = true;
			}
			label_rupees.p.label = "" + Q.state.get("rupees");
		})
		
		Q.state.on("change.gauntlet",this,function(){
			if(Q.state.get("gauntlet"))
				stage.insert(button_gauntlet);
			else
				stage.remove(button_gauntlet);
		})
		
		Q.state.on("change.water",this,function(){
			if(Q.state.get("water"))
				stage.insert(button_water);
			else
				stage.remove(button_water);
		})
    });

    Q.scene("level1", function(stage) {
        Q.stageTMX("Level1.tmx", stage);

        Q.state.set({currentLevel: 1});

        Q.audio.play("hyrule-field-80.mp3",{loop: true});
        
        stage.add("viewport").follow(Q("Link").items[0],{x:true, y:true});
        stage.viewport.scale = 1;
        stage.viewport.offsetX = -150;

        stage.on("destroy",function() {
            Q("Link").items[0].destroy();
        });
        Q.stageScene('background', 0, {image:"Level1bg.png"});
    });
	
	Q.scene("level2", function(stage) {
        Q.stageTMX("Level2.tmx", stage);

        Q.state.set({currentLevel: 2});

        Q.audio.play("hyrule-castle.mp3",{loop: true});
        
        stage.add("viewport").follow(Q("Link").items[0],{x:true, y:true});
        stage.viewport.scale = 1;
        stage.viewport.offsetX = -150;

        stage.on("destroy",function() {
            Q("Link").items[0].destroy();
        });

        Q.stageScene('background', 0, {image:"Level2bg.png"});
    });

    Q.scene("level3", function(stage) {
        Q.stageTMX("Level3.tmx", stage);

        Q.state.set({currentLevel: 3});

        Q.audio.play("ganon-laugh.mp3");
        Q.audio.play("final-battle.mp3",{loop: true});
        
        stage.add("viewport").follow(Q("Link").items[0],{x:true, y:false});
        stage.viewport.scale = 1;
        stage.viewport.offsetX = -150; 

        stage.on("destroy",function() {
            Q("Link").items[0].destroy();
        });

        Q.stageScene('background', 0, {image:"Level3bg.png"});
    });
}