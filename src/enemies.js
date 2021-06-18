function loadEnemies(Q){
    Q.component("defaultEnemy", {
		extend: { 
			hitLink: function(col){
				if(this.p.paid) {
					this.p.animation = false;
					return;
				}
				if(!col.obj.isA("Link")) return;

				if(col.normalX == 1){
					this.play("attack_r");
				}else{
					this.play("attack_l");
				}
				
				if(col.obj.hit(col, "normal", this.p.dmg)){
					Q.audio.play(this.p.attackSound);
				}				
			},
			hit: function(col, object, dmg){
				if(this.p.paid) return;
				if(this.p.invulnerable) return;
				
				if(this.isA("Militron")){
					if(object == "Ray"){
						Q.audio.play("shield.mp3");
						return;
					}
					if(object == "Sword" && Q.state.get("gauntlet")){
						dmg *= 3;
					}
					else{
						dmg *= 0.5;
					}
				}

				this.p.invulnerable = true;
				this.p.health -= dmg;

				const aux = this.p.vx;
			
				this.animate({vx: this.p.vx = -300*col.normalX, vy: this.p.vy = -100}, 0.18, Q.Easing.Linear,
					{callback: function(){
						this.p.vx = aux;
				}});

				if(this.p.health <= 0){
					Q.audio.play(this.p.deathSound);

					const prob = Math.random();
					if(this.isA("Militron")){
						if(!Q.state.get("gauntlet"))
							Q.stage('4').insert(new Q.Notification({x:Q.width/2, y:105, label: "Vaya, lo has hecho bien en esta dura batalla, aunque cierto objeto te habría ayudado" , color: "white", outlineColor: "white", scale: 0.6}));
						this.stage.insert(new Q.Water({x:this.p.x, y:this.p.y}));
					}
					else if(this.isA("Ganon")){
						this.stage.insert(new Q.Triforce({x:this.p.x, y:this.p.y}));
					}
					else{
						if(prob < 0.25){
							this.stage.insert(new Q.Heart({x:this.p.x, y:this.p.y}));
						} else if(prob < 0.30){
							this.stage.insert(new Q.Rupee({x:this.p.x, y:this.p.y}));
						} else if(prob < 0.5){
							this.stage.insert(new Q.BombPickup({x:this.p.x, y:this.p.y}));
						}
					}
					
					if(this.isA("Ganon"))
						this.stage.insert(new Q.GanonDeath({x:this.p.x, y:this.p.y}));
					this.stage.insert(new Q.EnemyDeath({x:this.p.x, y:this.p.y}));

					this.destroy();
				} 
				else{
					if(object == "Sword"){
						Q.audio.play(this.p.hurtSwordSound);
					} else{
						Q.audio.play(this.p.hurtSound);
					}
				}
			},
			step: function(dt){
				if(this.p.paid){
					this.p.opacity-=dt/5;
					if(this.p.opacity<=0)
						this.destroy();
				}
				if(this.p.invulnerable){
					this.p.invulnerableTime += dt;
					this.p.invulnerable = this.p.invulnerableTime < 0.75;

					if(!this.p.invulnerable){
						this.p.invulnerableTime = 0;
					}
				}
			},
			getRupee: function(){
				this.p.paid = true;
				this.p.vx = 0;
				this.p.sensor = false;
				if(this.p.direction == "right") 
					this.play("walk_r");
				else
					this.play("walk_l");
				this.p.animation = false;
				this.stage.insert(new Q.Rupee({y:-10, taken:true, enemyPaid:true}), this);;
			}, 
		}
	});

	Q.Sprite.extend("Armos", {
		init: function(p) {
			this._super(p,{
			  sheet: "armos-walking",
			  sprite: "armos-anim",
			  frame: 0,
			  scale: 1,
			  x: 20,
			  y: -10,
			  vx: 75,
			  type: Q.SPRITE_ENEMY,
			  sensor: true,
			  invulnerable: false,
			  invulnerableTime: 0,
			  health: 5,
			  dmg: 1,
			  hurtSwordSound: "armos-hit-sword.mp3",
			  hurtSound: "armos-hit.mp3",
			  attackSound: "armos-attack.mp3",
			  deathSound: "armos-dead.mp3",
			  paid: false
			});
			this.add('2d, aiBounce, tween, animation, defaultEnemy');
			this.play("walk_r");

			this.on("bump.left", this, function(){this.play("walk_r");});
			this.on("bump.right", this, function(){this.play("walk_l");});
			this.on("hit", this, "hitLink");
		  },
	});

	Q.Sprite.extend("Stalfos", {
		init: function(p) {
			this._super(p,{
			  sheet: "stalfos-walking",
			  sprite: "stalfos-anim",
			  frame: 0,
			  scale: 1,
			  x: 20,
			  y: -10,
			  vx: 100,
			  type: Q.SPRITE_ENEMY,
			  sensor: true,
			  invulnerable: false,
			  invulnerableTime: 0,
			  health: 3,
			  dmg: 0.5,
			  hurtSwordSound: "stalfos-hit-sword.mp3",
			  hurtSound: "stalfos-hit.mp3",
			  attackSound: "stalfos-attack.mp3",
			  deathSound: "stalfos-dead.mp3",
			  paid: false
			});
			this.add('2d, aiBounce, tween, animation, defaultEnemy');
			this.play("walk_r");

			this.on("bump.left", this, function(){this.play("walk_r");});
			this.on("bump.right", this, function(){this.play("walk_l");});
			this.on("hit", this, "hitLink");
		  },
	});

	Q.Sprite.extend("Moblin", {
		init: function(p) {
			this._super(p,{
			  sheet: "moblin-walking",
			  sprite: "moblin-anim",
			  frame: 0,
			  scale: 1,
			  x: 20,
			  y: -10,
			  vx: 50,
			  type: Q.SPRITE_ENEMY,
			  sensor: true,
			  invulnerable: false,
			  invulnerableTime: 0,
			  health: 8,
			  dmg: 2,
			  hurtSwordSound: "moblin-hit-sword.mp3",
			  hurtSound: "moblin-hit.mp3",
			  attackSound: "moblin-attack.mp3",
			  deathSound: "moblin-dead.mp3",
			  direction: "right",
			  ttl: 1.2,
			  paid: false
			});
			this.add('2d, aiBounce, tween, animation, defaultEnemy');
			this.play("walk_r");

			this.on("bump.left", this, function(){this.play("walk_r"), this.p.direction = "right";});
			this.on("bump.right", this, function(){this.play("walk_l"), this.p.direction = "left";});
			this.on("hit", this, "hitLink");
			this.on("step", this, "throw");
		},
		throw: function(dt){
			if(this.p.paid) return;
			
			if(this.p.health > 0){
				var link = Q("Link",1).items[0];
					
				if (Math.abs(link.p.y - this.p.y) <= 8 && this.p.direction == "right" && this.p.x < link.p.x && (link.p.x - this.p.x) <= 250){
					this.p.vx = 0;
					if(this.p.ttl >= 1.2){
						this.play("kneel_r");
						this.stage.insert(new Q.Spear({x:this.p.x+this.p.w-8, y:this.p.y-20, vx:175}));
						this.p.ttl = 0;
					}else{
						this.p.ttl += dt;
					}
				}
				
				else if (Math.abs(link.p.y - this.p.y) <= 8 && this.p.direction == "left" && link.p.x < this.p.x && (this.p.x - link.p.x) <= 250 ){
					this.p.vx = 0;
					if(this.p.ttl >= 1.2){
						this.play("kneel_l");
						this.stage.insert(new Q.Spear({x:this.p.x-this.p.w+8, y:this.p.y-20, vx:-150, flip:"x"}));
						this.p.ttl = 0;
					}else{
						this.p.ttl += dt;
					}
				}
				
				else{
					if(this.p.direction == "right"){
						this.play("walk_r");
						this.p.vx = 50;
					}
					else{
						this.play("walk_l");
						this.p.vx = -50;
					}
				}
				
			}
		}
	});
	
	Q.Sprite.extend("Acheman", {
		init: function(p) {
			this._super(p,{
			  sheet: "acheman-walking",
			  sprite: "acheman-anim",
			  frame: 0,
			  scale: 1,
			  x: 20,
			  y: -10,
			  vx: 100,
			  type: Q.SPRITE_ENEMY,
			  gravity: 0,
			  sensor: true,
			  invulnerable: false,
			  invulnerableTime: 0,
			  health: 1,
			  dmg: 0.5,
			  hurtSwordSound: "acheman-hit.mp3",
			  hurtSound: "acheman-hit.mp3",
			  attackSound: "acheman-attack.mp3",
			  deathSound: "acheman-dead.mp3",
			  ttx: 0
			});
			this.add('2d, aiBounce, tween, animation, defaultEnemy');
			this.play("walk_r");

			this.on("bump.left", this, function(){this.play("walk_r"), this.p.direction = "right";});
			this.on("bump.right", this, function(){this.play("walk_l"), this.p.direction = "left";});
			this.on("hit", this, "hitLink");
			this.on("step", this, "attack");
		  },
		  attack: function(dt){
			if(this.p.ttx >= 3){
				if(this.p.direction == "right"){
					this.p.direction == "left";
					this.play("walk_l");
					this.p.vx = -100;
				}
				else{
					this.p.direction == "right";
					this.play("walk_r");
					this.p.vx = 100;
				}
				this.p.ttx =0;
			}
			else{
				this.p.ttx += dt;
			}
		  }
	});
	
	Q.Sprite.extend("Militron", {
		init: function(p) {
			this._super(p,{
			  sheet: "militron-walking",
			  sprite: "militron-anim",
			  frame: 0,
			  scale: 1,
			  x: 20,
			  y: -10,
			  vx: 40,
			  type: Q.SPRITE_ENEMY,
			  sensor: true,
			  invulnerable: false,
			  invulnerableTime: 0,
			  health: 20,
			  dmg: 2,
			  hurtSwordSound: "militron-hit.mp3",
			  hurtSound: "militron-hit.mp3",
			  attackSound: "militron-attack.mp3",
			  deathSound: "militron-dead.mp3",
			  direction: "right",
			  ttl: 1.2,
			  ttrng: 1,
			});
			this.add('2d, aiBounce, tween, animation, defaultEnemy');
			this.play("walk_r");

			this.on("bump.left", this, function(){this.play("walk_r"), this.p.direction = "right";});
			this.on("bump.right", this, function(){this.play("walk_l"), this.p.direction = "left";});
			this.on("hit", this, "hitLink");
			this.on("step", this, "fire");
		},
		fire: function(dt){
			var prob = Math.random();
				if(this.p.ttrng >= 1 && prob < 0.02){
					if(this.p.direction == "right"){
						this.p.vx = 0;
						this.play("fire_r");
						this.stage.insert(new Q.MilitronFire({x:this.p.x+this.p.w-10, y:this.p.y-20, vx:175}));
					}
					else{
						this.p.vx = 0;
						this.play("fire_l");
						this.stage.insert(new Q.MilitronFire({x:this.p.x-this.p.w+10, y:this.p.y-20, vx:-150, flip:"x"}));
					}
					this.p.ttrng = 0;
				}
				else{
					this.p.ttrng += dt;
				}
				
			var ray = Q("Ray",1).items[0];
			if(this.p.health > 0 && ray){
				
					
				if (Math.abs(ray.p.y - this.p.y) <= 55 && this.p.direction == "right" && this.p.x < ray.p.x && (ray.p.x - this.p.x) <= 250){
					this.p.vx = 0;
					this.play("fire_r");
					this.stage.insert(new Q.MilitronFire({x:this.p.x+this.p.w-10, y:this.p.y-20, vx:175}));
				}
				
				else if (Math.abs(ray.p.y - this.p.y) <= 55 && this.p.direction == "left" && ray.p.x < this.p.x && (this.p.x - ray.p.x) <= 250 ){
					this.p.vx = 0;
					this.play("fire_l");
					this.stage.insert(new Q.MilitronFire({x:this.p.x-this.p.w+10, y:this.p.y-20, vx:-150, flip:"x"}));
				}
				
			}
			else if(this.p.ttl >= 1.2){
					if(this.p.direction == "right"){
						this.play("walk_r");
						this.p.vx = 50;
						this.p.ttl =0;
					}
					else{
						this.play("walk_l");
						this.p.vx = -50;
						this.p.ttl =0;
					}
			}
			else{
				this.p.ttl += dt;
			}
		}
	});
	
	Q.Sprite.extend("Ganon", {
		init: function(p) {
			this._super(p,{
			  sheet: "ganon-walking",
			  sprite: "ganon-anim",
			  frame: 0,
			  scale: 1,
			  x: 20,
			  y: -10,
			  vx: 70,
			  type: Q.SPRITE_ENEMY,
			  sensor: true,
			  invulnerable: false,
			  invulnerableTime: 0,
			  health: 20,
			  dmg: 3,
			  hurtSwordSound: "ganon-hit.mp3",
			  hurtSound: "ganon-hit.mp3",
			  attackSound: "ganon-attack.mp3",
			  deathSound: "ganon-dead.mp3",
			  cd: false,
			  ttrng: 0,
			  ttx: 4
			});
			this.add('2d, aiBounce, tween, animation, defaultEnemy');
			this.play("walk_r");

			this.on("bump.left", this, function(){this.play("walk_r"), this.p.direction = "right";});
			this.on("bump.right", this, function(){this.play("walk_l"), this.p.direction = "left";});
			this.on("hit", this, "hitLink");
			this.on("step", this, "fire");
		  },
		  fire: function(dt){
			if(this.p.ttrng >= 1.5 && !this.p.cd){
				var prob = Math.random();
				//if(prob < 0.2){
					if(this.p.direction == "right"){
						this.p.vx = 0;
						this.play("attack_r");
						this.stage.insert(new Q.GanonFire({x:this.p.x+this.p.w-10, y:this.p.y-20, vx:175}));
					}
					else{
						this.p.vx = 0;
						this.play("attack_l");
						this.stage.insert(new Q.GanonFire({x:this.p.x-this.p.w+10, y:this.p.y-20, vx:-150, flip:"x"}));
					}
				//}
				this.p.cd = true;
			}
			else if(this.p.ttrng >= 2.5){
				if(this.p.direction == "right"){
					this.play("walk_r");
					this.p.vx = 50;
					this.p.ttrng =0;
				}
				else{
					this.play("walk_l");
					this.p.vx = -50;
					this.p.ttrng =0;
				}
				this.p.cd = false;
			}
			else{
				this.p.ttrng += dt;
			}
			if(this.p.ttx >= 3){
				var probA = Math.random();
				if(probA < 0.2){
					if(this.p.direction == "right"){
						this.p.direction == "left";
						this.play("walk_l");
						this.p.vx = -50;
					}
					else{
						this.p.direction == "right";
						this.play("walk_r");
						this.p.vx = 50;
					}
				}
				this.p.ttx = 0;
			}
			else{
				this.p.ttx += dt;
			}
		}
	});
}