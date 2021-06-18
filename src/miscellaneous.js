function loadMiscellaneous(Q){
	//***    ARMAS DE LINK    ***//
    Q.Sprite.extend("Sword", {
		init: function(p){
			this._super(p, {
				asset: "sword.png",
				x: 10,
				y: 10,
				frame: 0,
				scale: 1,
				sensor: true,
				dmg: 1,
				ttl: 0
			});

			this.on("hit", this, "hit")
		},
		step: function(dt){
			if(this.p.ttl >= 0.17){
				this.destroy();
			}else{
				this.p.ttl += dt;
			}
		},
		hit: function(col){
			if(col.obj.isA("Link")) return;
			col.obj.hit(col, "Sword", (this.p.dmg + Q("Link",1).items[0].p.god));
		}
	});
	
	Q.Sprite.extend("Ray", {
		init: function(p){
			this._super(p, {
				asset: "ray.png",
				x: 10,
				y: 10,
				frame: 0,
				scale: 1,
				sensor: true,
				ttl: 0,
				dmg: 0.5,
				gravity: 0
			});
			this.add("2d");
			this.on("hit", this, "hit");
			
		},
		step: function(dt){
			if(this.p.ttl >= 1){
				this.destroy();
			}else{
				this.p.ttl += dt;
			}
		},
		hit: function(col){
			if(col.obj.p.type == 5) return;
			if(col.obj.p.type == Q.SPRITE_ENEMY) col.obj.hit(col, "Ray", (this.p.dmg + Q("Link",1).items[0].p.god));
			this.p.x = 0;
			this.p.y = 0;
			this.destroy();
		}
	});
	
	//***    ATAQUES ENEMIGOS    ***//
	Q.Sprite.extend("Spear", {
		init: function(p){
			this._super(p, {
				asset: "spear.png",
				x: 10,
				y: 10,
				type: Q.SPRITE_PROJECTILE,
				frame: 0,
				scale: 1,
				sensor: true,
				ttl: 0,
				dmg: 0.5,
				gravity: 0.1
			});
			this.add("2d");
			this.on("hit", this, "hit");
			
		},
		hit: function(col){
			if(col.obj.isA("Sword") || col.obj.isA("Ray")) this.destroy();
			if(col.obj.p.type == 5 || col.obj.p.type == Q.SPRITE_PROJECTILE || col.obj.p.type == Q.SPRITE_ENEMY) return;
			if(col.obj.isA("Link")) col.obj.hit(col, "spear", this.p.dmg);
			this.destroy();
		}
	});
	
	Q.Sprite.extend("MilitronFire", {
		init: function(p){
			this._super(p, {
				sheet: "militronFire",
				sprite: "militronFire-anim",
				x: 10,
				y: 10,
				type: Q.SPRITE_PROJECTILE,
				frame: 0,
				scale: 1,
				sensor: true,
				ttl: 0,
				dmg: 0.5,
				gravity: 0
			});
			this.add("2d, animation");
			this.on("hit", this, "hit");
			this.play("anim");
			
		},
		step: function(dt){
			if(this.p.ttl >= 5){
				this.destroy();
			}else{
				this.p.ttl += dt;
			}
		},
		hit: function(col){
			if(col.obj.p.type == 5 || col.obj.p.type == Q.SPRITE_PROJECTILE || col.obj.p.type == Q.SPRITE_ENEMY) return;
			if(col.obj.isA("Link")) col.obj.hit(col, "militronFire", this.p.dmg);
			this.destroy();
		}
	});
	
	Q.Sprite.extend("GanonFire", {
		init: function(p){
			this._super(p, {
				sheet: "ganonFire",
				sprite: "ganonFire-anim",
				x: 10,
				y: 10,
				type: Q.SPRITE_PROJECTILE,
				frame: 0,
				scale: 1,
				sensor: true,
				ttl: 0,
				dmg: 1,
				gravity: 0.1,
				flame: false
			});
			this.add("2d, animation");
			this.on("hit", this, "hit");
			this.play("anim");
			
		},
		hit: function(col){
			if(col.obj.p.type == 5 || col.obj.p.type == Q.SPRITE_PROJECTILE || col.obj.p.type == Q.SPRITE_ENEMY) return;
			if(col.obj.isA("Link"))
				col.obj.hit(col, "ganonFire", this.p.dmg);
			else{
				if(!this.p.flame) this.stage.insert(new Q.Flame({x:this.p.x, y:this.p.y, drop: true}));
				this.p.flame = true;
			}
			this.destroy();
		}
	});
	
	Q.Sprite.extend("Flame", {
		init: function(p){
			this._super(p, {
				sheet: "flame",
				sprite: "flame-anim",
				x: 10,
				y: 10,
				type: Q.SPRITE_PROJECTILE,
				frame: 0,
				scale: 1.5,
				sensor: true,
				ttl: 0,
				dmg: 1
			});
			this.add("2d, animation");
			this.on("hit", this, "hit");
			this.play("anim");
			
		},
		step: function(dt){
			if(this.p.ttl >= 5){
				this.destroy();
			}else{
				this.p.ttl += dt;
			}
		},
		step: function(dt){
			this.p.ttl += dt;

			if(this.p.ttl >= 22.5 && ((this.p.ttl % 0.5) != 0)){
				this.p.hidden = !this.p.hidden;
			}

			if(this.p.ttl >25){
				this.destroy();
			}
		},
		hit: function(col){
			if(col.obj.isA("Sword") && Q.state.get("water")) this.destroy();
			if(col.obj.p.type == 5 || col.obj.p.type == Q.SPRITE_PROJECTILE || col.obj.p.type == Q.SPRITE_ENEMY) return;
			if(col.obj.isA("Link")){ col.obj.hit(col, "flame", this.p.dmg); }
		}
	});

	//***    MUERTES ENEMIGO    ***//
	Q.Sprite.extend("EnemyDeath",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				type: Q.SPRITE_ENEMY,
				sheet: "deathExplosion",
				sprite: "enemyDeath",
				scale: 1.5,
				frame: 0,
				sensor: true,
				ttl: 0
			});
			this.add("animation");
			this.play("explode");
		},
		step: function(dt){
			this.p.ttl += dt;
			if(this.p.ttl > 0.7){
				this.destroy();
			}
		}
	});
	
	Q.Sprite.extend("GanonDeath",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				type: Q.SPRITE_ENEMY,
				sheet: "ganonExplosion",
				sprite: "ganonDeath",
				scale: 1.5,
				frame: 0,
				sensor: true,
				ttl: 0
			});
			this.add("animation");
			this.play("explode");
		},
		step: function(dt){
			this.p.ttl += dt;
			if(this.p.ttl > 2){
				this.destroy();
			}
		}
	});

	//***    ITEMS    ***//
	Q.Sprite.extend("Heart",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				asset: "heart.png",
				sensor: true,
				ttl: 0,
				taken: false
			});
			this.on("sensor", this, "hit");
		},
		step: function(dt){
			this.p.ttl += dt;

			if(this.p.ttl >= 2.5 && ((this.p.ttl % 0.5) != 0)){
				this.p.hidden = !this.p.hidden;
			}

			if(this.p.ttl > 5){
				this.destroy();
			}
		},
		hit: function(col){
			if(this.p.taken) return;
			if(!col.isA("Link")) return;
			
			this.taken = true;
			if(col.heal(1)){
				Q.audio.play("heal.mp3");
				this.destroy();
			}
				
		}
	});

	Q.Sprite.extend("HeartContainer",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				sheet: "heartContainer",
				sprite: "heartContainer-anim",
				scale: 2,
				frame: 0,
				sensor: true,
				taken: false
			});
			this.add("animation");
			this.on("sensor", this, "hit");
			this.play("anim");
		},
		hit: function(col){
			if(this.p.taken) return;
			if(!col.isA("Link")) return;
			
			this.taken = true;
			col.increaseLife();
			this.destroy();				
		}
	});

	Q.Sprite.extend("Key",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				sheet: "key",
				sprite: "key-anim",
				scale: 1.5,
				frame: 0,
				sensor: true,
				taken: false
			});
			this.add("animation");
			this.on("sensor", this, "hit");
			this.play("anim");
		},
		hit: function(col){
			if(this.p.taken) return;
			if(!col.isA("Link")) return;
			
			this.taken = true;
			Q.audio.play("key.mp3");
			Q.state.inc("keys", 1);
			this.destroy();				
		}
	});
	
	Q.Sprite.extend("Rupee",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				sheet: "rupee",
				sprite: "rupee-anim",
				frame: 0,
				sensor: true,
				taken: false,
				drop: false,
				enemyPaid: false
			});
			this.add("animation");
			this.on("sensor", this, "hit");
			this.play("anim");
		},
		hit: function(col){
			if(this.p.taken) return;
			if(!col.isA("Link")) return;
			
			this.taken = true;
			Q.audio.play("rupee.mp3");
			Q.state.inc("rupees", 1);
			this.destroy();				
		},
		step: function(dt){
			if(this.p.enemyPaid){
				this.p.opacity-=dt/5;
				if(this.p.opacity<=0)
					this.destroy();
			}
		}
	});

	Q.Sprite.extend("RupeeDropped",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				asset: "rupee.png",
				scale: 0.8,
				sensor: true,
				ttl: 0
			});
			this.on("hit", this, "hit");
		},
		step: function(dt){
			this.p.ttl += dt;

			if(this.p.ttl >= 5.5 && ((this.p.ttl % 0.5) != 0)){
				this.p.hidden = !this.p.hidden;
			}

			if(this.p.ttl >7){
				this.stage.insert(new Q.Rupee({x:this.p.x, y:this.p.y, drop: true}));
				this.destroy();
			}
		},
		hit: function(col){
			if(col.obj.isA("Armos") || col.obj.isA("Stalfos") || col.obj.isA("Moblin")) {
				col.obj.getRupee();
				this.destroy();
			}
		}
	});
	
	Q.Sprite.extend("Bomb",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				asset: "bomb.png",
				sensor: true,
				ttl: 0
			});
			Q.audio.play("bombLit.mp3", {loop:true});
		},
		step: function(dt){
			this.p.ttl += dt;

			if(this.p.ttl >= 2.5 && ((this.p.ttl % 0.5) != 0)){
				this.p.hidden = !this.p.hidden;
			}

			if(this.p.ttl > 5){
				this.stage.insert(new Q.BombExplosion({x:this.p.x, y:this.p.y}));
				Q.audio.stop("bombLit.mp3");
				this.destroy();
			}
		}
	});

	Q.Sprite.extend("BombPickup",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				asset: "bomb.png",
				sensor: true,
				taken: false,
				ttl: 0
			});
			this.on("sensor", this, function(col){
				if(this.p.taken) return;
				if(!col.isA("Link")) return;
			
				this.taken = true;
				Q.audio.play("bombPickup.mp3");
				Q.state.inc("bombs", 1);
				this.destroy();	
			})
		},
		step: function(dt){
			this.p.ttl += dt;

			if(this.p.ttl >= 2.5 && ((this.p.ttl % 0.5) != 0)){
				this.p.hidden = !this.p.hidden;
			}

			if(this.p.ttl > 5){
				this.destroy();
			}
		}
	});

	Q.Sprite.extend("BombExplosion",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				sheet: "bombExplosion",
				sprite: "bomb-explosion-anim",
				scale: 1.5,
				frame: 0,
				dmg: 3,
				sensor: true,
				ttl: 0
			});
			this.add("animation");
			this.play("explode");
			Q.audio.play("bombExplosion.mp3");
			this.on("hit", this, "hit");
		},
		step: function(dt){
			this.p.ttl += dt;
			if(this.p.frame == 2 && this.p.ttl > 0.6)
				this.destroy();
		},
		hit: function(col){
			if(this.p.frame == 1){
				if(col.obj.isA("Link"))
					col.obj.hit(col, this.p.dmg);
				else
					col.obj.hit(col, "Bomb", this.p.dmg);
			}
		}
	});
	
	Q.Sprite.extend("Triforce",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				sheet: "triforce",
				sprite: "triforce-anim",
				scale: 1.5,
				frame: 0,
				sensor: true
			});
			this.add("animation");
			this.play("shine");
			
			this.on("hit", this, "hit");
		},
		hit: function(col){
			if(!col.obj.isA("Link")) return;
			
			Q.stage().pause();
            Q.stageScene("GameOver",2, {win: true, label: "You win!"});
		}
	});
	
	Q.Sprite.extend("Book",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				asset: "book.png",
				scale: 1,
				frame: 0,
				sensor: true
			});
			
			this.on("hit", this, "hit");
		},
		hit: function(col){
			if(!col.obj.isA("Link")) return;
			
			Q.stage().pause();
            Q.stageScene("nextLevel",1, {level: 2});
		}
	});

	//***    ENTORNO    ***//
	Q.Sprite.extend("Door",  {
		init: function(p){
			this._super(p, {
				sheet: "door-medium1",
				sprite: "door-anim",
				x: 0,
				y: 0,
				//asset: "door.png",
				collision: true,
				touched: false,
				opened: false,
				ttl: 0
			});
			this.add('animation');
			this.on("hit", this, "hit");
		},
		hit: function(col){
			if(!col.obj.isA("Link") || this.p.touched || this.p.opened) return;
			
			this.p.touched = true;

			if(Q.state.get("keys") < 1){
				Q.audio.play("closedDoor.mp3"); 
				return;
			}
			
			this.play("medium2");
			Q.audio.play("openDoor.mp3");
			Q.state.dec("keys", 1);
			this.p.opened = true;
			this.p.sensor=true;
			
		},
		step: function(dt){
			if(this.p.opened) return;
			if(this.p.touched){
				this.p.ttl += dt;
				this.p.touched = this.p.ttl < 0.5;

				if(!this.p.touched){
					this.p.ttl = 0;
				}
			}
		}
	});
	
	//***    BUFFOS    ***//
	Q.Sprite.extend("Shield",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				asset: "shield.png",
				scale: 1,
				frame: 0,
				sensor: true,
				taken: false
			});
			this.on("sensor", this, "hit");
		},
		hit: function(col){
			if(this.p.taken) return;
			if(!col.isA("Link")) return;
			
			Q.audio.play("get-item.mp3");
			this.taken = true;
			col.buff("shield");
			this.destroy();				
		}
	});
	
	Q.Sprite.extend("Helmet",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				asset: "helmet.png",
				scale: 1,
				frame: 0,
				sensor: true,
				taken: false
			});
			this.on("sensor", this, "hit");
		},
		hit: function(col){
			if(this.p.taken) return;
			if(!col.isA("Link")) return;
			
			Q.audio.play("get-item.mp3");
			this.taken = true;
			col.buff("helmet");
			this.destroy();				
		}
	});
	
	Q.Sprite.extend("Gauntlet",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				asset: "gauntlet.png",
				scale: 1,
				frame: 0,
				sensor: true,
				taken: false
			});
			this.on("sensor", this, "hit");
		},
		hit: function(col){
			if(this.p.taken) return;
			if(!col.isA("Link")) return;
			
			Q.audio.play("get-item.mp3");
			this.taken = true;
			col.buff("gauntlet");
			this.destroy();				
		}
	});
	
	Q.Sprite.extend("Water",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				sheet: "water",
				sprite: "water-anim",
				scale: 1.2,
				frame: 0,
				sensor: true,
				taken: false,
			});
			this.add("animation");
			this.on("sensor", this, "hit");
			this.play("anim");
		},
		hit: function(col){
			if(this.p.taken) return;
			if(!col.isA("Link")) return;
			
			Q.audio.play("get-item.mp3");
			this.taken = true;
			col.buff("water");
			this.destroy();				
		}
	});
	
	//***    EXTRAS    ***//
	Q.UI.Text.extend("Notification",  {
		init: function(p){
			this._super(p, {
				x: 0,
				y: 0,
				dissapear:0
			});
		},
		step: function(dt){
			if(this.p.dissapear >= 5){
				this.p.opacity-=dt/7;
				if(this.p.opacity<=0)
					this.destroy();
			}
			else
				this.p.dissapear += dt;
		}
	});
}