function loadPlayer(Q){
    Q.Sprite.extend("Link", {
        init: function(p){
            this._super(p, {
                sheet: "link-standing",
                sprite: "link-anim",
                x: 10,
                y: 10,
                frame: 0,
                scale: 1,
                fallingFast: false,
                attack: false,
                cooldownAttack: 0,
                jumpSpeed: -305,
                health: 3,
                maxHealth: 3,
                invulnerable: false,
                invulnerableTime: 0,
				type: Q.SPRITE_DEFAULT,
				god: 0
            });

            this.add("2d, platformerControls, animation, tween");

            if(!Q.state.get("init")){
                Q.state.set({init:true});
                Q.state.set({health: this.p.health, maxHealth: this.p.maxHealth, keys: 0, bombs: 0, shield: false, helmet: false, activeHelmet: false, rupees: 0, gauntlet: false, water: false});
            } else{
                this.p.health = Q.state.get("health");
                this.p.maxHealth = Q.state.get("maxHealth");
            };

            Q.input.on("up", this, function(){
                if(this.p.vy == 0){
                    if(Math.random() > 0.5){
                        Q.audio.play("jump1.mp3");
                    } else{
                        Q.audio.play("jump2.mp3");
                    }
                }
            });

            Q.input.on("fire", this, "attack");
            Q.input.on("S", this, "dropBomb");
			Q.input.on("ctrl", this, "god");
			Q.input.on("C", this, "activateHelmet");
			Q.input.on("D", this, "dropRupee");
        },
        step: function(dt){
            if(this.p.invulnerable){
                this.p.invulnerableTime += dt;
                this.p.invulnerable = this.p.invulnerableTime < 0.75;

                if(!this.p.invulnerable){
                    this.p.invulnerableTime = 0;
                }
            }

            if(this.p.attack){
                this.p.cooldownAttack += dt;
            }
            if(this.p.cooldownAttack > 0.2){
                this.p.cooldownAttack = 0;
                this.p.attack = false;
            }

            if(this.p.vx > 0){
                this.p. points = [[-22.5, -24],[8, -24],[8, 24],[-22.5, 24]];
                this.play("walk_right");
            } else if(this.p.vx < 0){
                this.p. points = [[-8, -24],[22.5, -24],[22.5, 24],[-8, 24]];
                this.play("walk_left");
            }

            if(this.p.vy < 0){
                if(this.p.direction == "right"){
                    this.p.points = [[-10, -24],[22.5, -24],[22.5, 24], [-10, 24]];
                    this.play("jump_right");
                } else{
                    this.p.points = [[-22.5, -24],[10, -24],[10, 24], [-22.5, 24]];
                    this.play("jump_left");
                }
            } else if(this.p.vy > 0){
                if(this.p.vy > 600 && !this.p.fallingFast){
                    this.p.fallingFast = true;
                    Q.audio.play("scream.mp3");
                }
                if(this.p.direction == "right"){
                    this.p.points = [[-10, -24],[22.5, -24],[22.5, 24], [-10, 24]];
                    this.play("falling_right");
                } else{
                    this.p.points = [[-22.5, -24],[10, -24],[10, 24], [-22.5, 24]];
                    this.play("falling_left");
                }
            }

            if(!this.p.attack && this.p.vx == 0 && this.p.vy == 0){
                Q.audio.stop("scream.mp3");
                this.p.fallingFast = false;
                this.p.points = [[-22.5, -24],[22.5, -24],[22.5, 24], [-22.5, 24]];
                if(this.p.direction == "right"){
                    this.play("stop_r");
                } else{ 
                    this.play("stop_l");
                }
            }
        },
        attack: function(){
            if(!this.p.attack && this.p.vx == 0 && this.p.vy == 0){
                this.p.attack = true;

                switch(Math.floor(Math.random() * (4 - 1 + 1) + 1)){
                    case 1: Q.audio.play("attack1.mp3"); break;
                    case 2: Q.audio.play("attack2.mp3"); break;
                    case 3: Q.audio.play("attack3.mp3"); break;
                    case 4: Q.audio.play("attack4.mp3"); break;
                }
    
                if(this.p.direction == "right"){
					this.play("attack_right");
					if(this.p.health == this.p.maxHealth){
						this.stage.insert(new Q.Ray({x:this.p.x+this.p.w+12, y:this.p.y-2, vx:175}));
						Q.audio.play("stats-ray.mp3");
					}
					this.stage.insert(new Q.Sword({x:this.p.x+this.p.w-8, y:this.p.y-2}));
                } else{
                    this.play("attack_left");
					if(this.p.health == this.p.maxHealth){
						this.stage.insert(new Q.Ray({x:this.p.x-this.p.w-12, y:this.p.y-2, flip:"x", vx:-175}));
						Q.audio.play("stats-ray.mp3");
					}
					this.stage.insert(new Q.Sword({x:this.p.x-this.p.w+8, y:this.p.y-2, flip:"x"}));
                }
                
            }
        },
        hit: function(col, type, dmg){
            if(this.p.invulnerable) return false;

            this.p.invulnerable = true;
			
			if(type == "spear"){
				if(Q.state.get("shield") && this.p.vx == 0)
					if(((this.p.direction == "left" && col.normalX == -1) || (this.p.direction == "right" && col.normalX == 1))){
						Q.audio.play("shield.mp3");
						return;
					}
			}
			else if(type == "ganonFire"){
				if(Q.state.get("water")){
					if(((this.p.direction == "left" && col.normalX == -1) || (this.p.direction == "right" && col.normalX == 1)) && (Q.state.get("shield") && this.p.vx == 0)){
						Q.audio.play("shield.mp3");
						return;
					}
					else
						dmg /= 2;
				}
			}
			
			if(type == "flame" && Q.state.get("water")){
				dmg /= 2;
			}
			
            this.p.health -= dmg;
            Q.state.dec("health", dmg);
			
            if(this.p.health <= 0){
                Q.state.set({init:false});
                this.p.sensor = true;
                this.animate({x:this.p.x, y:this.p.y+15, angle:-col.normalX*90}, 0.5, Q.Easing.Linear, 
                    {callback: function(){
                        this.p.sheet = "link-walking";
                        this.p.frame = 1;
                        Q.stage().pause();

                        Q.stageScene("GameOver",2, {win: false, label: "Game Over"});
                    }});
                
            } else{
                this.animate({vx: this.p.vx = -700*col.normalX, vy: this.p.vy = -125}, 0.1, Q.Easing.Linear);

                Q.audio.play("link-hurt.mp3");
            }

            return true;
        },
		god: function(){
			this.p.health = 10;
			this.p.maxHealth = 10;
			Q.state.set({health: 10, maxHealth: 10, keys: 10, bombs: 10, shield: true, helmet: true, rupees: 10, gauntlet: true, water: true});
			this.p.god = 100;
		},
        heal: function(heal){

            if(this.p.health < this.p.maxHealth){
                if((this.p.health + heal) > this.p.maxHealth){
                    this.p.health = this.p.maxHealth;
                    Q.state.set("health", this.p.maxHealth);
                }else{
                    this.p.health += heal;
                    Q.state.inc("health", heal);
                }
                return true;
            }
            return false;
        },
        increaseLife: function(){
            Q.state.inc("maxHealth", 1);
            this.p.maxHealth++;
            this.heal(this.p.maxHealth);
            Q.audio.play("lifeIncrease.mp3");
        },
        dropBomb: function(){
            if(Q.state.get("bombs") > 0 && !this.p.attack && this.p.vx == 0 && this.p.vy == 0){
                Q.state.dec("bombs", 1);
                this.stage.insert(new Q.Bomb({x:this.p.x, y:this.p.y + this.p.h - 35}));
            }
            
        },
		buff: function(buff){
			if(buff == "shield"){
				Q.state.set({shield: true});
				Q.stage('4').insert(new Q.Notification({x:Q.width-150, y:15, label: "Mantente firme frente las Lanzas" , color: "black", outlineColor: "white", scale: 0.5}));
			}
			else if(buff == "helmet" && !Q.state.get("helmet")){
				Q.state.set({helmet: true, activeHelmet: true});
				this.p.jumpSpeed *= 1.25;
				this.p.speed *= 1.3;
				Q.stage('4').insert(new Q.Notification({x:Q.width-165, y:45, label: "Corre y salta, usa 'C' para des/activar" , color: "black", outlineColor: "white", scale: 0.5}));
			}
			else if(buff == "gauntlet"){
				Q.state.set({gauntlet: true});
				Q.stage('4').insert(new Q.Notification({x:Q.width-195, y:105, label: "Quizás este objeto ayude contra cierto enemigo" , color: "black", outlineColor: "white", scale: 0.5}));
			}
			else if(buff == "water"){
				Q.state.set({water: true});
				Q.stage('4').insert(new Q.Notification({x:Q.width-155, y:138, label: "¿Un frasco de agua? Pregúntale a G" , color: "black", outlineColor: "white", scale: 0.5}));
			}
		},
		activateHelmet: function(){
			if(!Q.state.get("helmet")) return;
			Q.audio.play("text-helmet.mp3");
			if(Q.state.get("activeHelmet")){
				this.p.jumpSpeed /= 1.25;
				this.p.speed /= 1.3;
			}
			else {
				this.p.jumpSpeed *= 1.25;
				this.p.speed *= 1.3;
			}
			Q.state.set({activeHelmet: !Q.state.get("activeHelmet")});
		},
		dropRupee: function(){
			if(Q.state.get("rupees") > 0 && !this.p.attack && this.p.vx == 0 && this.p.vy == 0){
                Q.state.dec("rupees", 1);
                this.stage.insert(new Q.RupeeDropped({x:this.p.x, y:this.p.y + this.p.h - 35}));
            }
		}
    }	
    );
    
}