    
    var b = document.getElementById('battlemusic');

	class Pokemon{
		constructor(name, sprite, hp, moves) {
			this.name = name;
			this.sprite = sprite;
			this.hp = hp;
			this.fullhp = hp;
			this.moves = moves;
		}
	};


    let pkmList = [
        ['Charizard', ['https://img.pokemondb.net/sprites/black-white/anim/back-normal/charizard.gif','https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif'], 360, [
            ['Flamethrower', 'fire', 95, 0.95],
            ['Dragon Claw', 'dragon', 80, 0.95],
            ['Air slash', 'fly', 75, 0.85],
            ['Slash', 'normal', 70, ]
        ]],
        ['Blastoise', ['https://img.pokemondb.net/sprites/black-white/anim/back-normal/blastoise.gif','https://img.pokemondb.net/sprites/black-white/anim/normal/blastoise.gif'], 362, [
            ['Surf', 'water', 90, 0.95],
            ['Crunch', 'normal', 80, 0.95],
            ['Ice punch', 'ice', 75, 0.95],
            ['Flash cannon', 'steel', 80, 0.95]
        ]],
        ['Venusaur', ['https://img.pokemondb.net/sprites/black-white/anim/back-normal/venusaur.gif','https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur.gif'] , 364, [
            ['Petal Blizzard', 'grass', 90, 0.95],
            ['Sludge bomb', 'poison', 90, 0.95],
            ['Earthquake', 'ground', 100, 0.95],
            ['Body Slam', 'normal', 85, 0.95]
        ]]
    ];

    let typeMatch = {
        'Charizard': [
            ['ground'],
            ['water', 'rock'],
            ['fire', 'grass', 'steel']
        ],
        'Blastoise': [
            [''],
            ['grass'],
            ['fire', 'water']
        ],
        'Venusaur': [
            ['poison'],
            ['fire', 'fly', 'ice', 'steel'],
            ['grass', 'water']
        ],
    };

    function spawn(bool){
    	let p = pkmList[Math.floor(Math.random()*pkmList.length)];
    	let pkm = new Pokemon(p[0], p[1], p[2], p[3]);
    	return(pkm);
    };

    let pk1 = spawn(true);


    s1 = document.createElement('img');
    s1.src = pk1.sprite[0];
    document.getElementById('pk1').appendChild(s1);
    document.getElementById('hp1').innerHTML = `<p>${pk1.name} <br> HP:'  ${pk1.hp} /  ${pk1.fullhp} </p>`;
    for(i=0; i < 4; i++){
        document.getElementById('m'+ i).value = pk1.moves[i][0];

        switch(pk1.moves[i][1]){
            case 'fire':
            document.getElementById('m'+i).style.background = "red";
            break;

            case 'water':
            document.getElementById('m'+i).style.background = "blue";
            break;

            case 'grass':
            document.getElementById('m'+i).style.background = "green";
            break;
            case 'ice':
            document.getElementById('m'+i).style.background = "cyan";
            break;

            case 'poison':
            document.getElementById('m'+i).style.background = "purple";
            break;

            case 'normal':
            document.getElementById('m'+i).style.background = "beige";
            break;

            case 'fly':
            document.getElementById('m'+i).style.background = "aquamarine";
            break;

            case 'steel':
            document.getElementById('m'+i).style.background = "silver";
            break;

            case 'ground':
            document.getElementById('m'+i).style.background = "chocolate";
            break;

            case 'dragon':
            document.getElementById('m'+i).style.background = "powderblue";
            break;
        }
        };


    let pk2 = spawn(false);

    s2 = document.createElement('img');
    s2.src = pk2.sprite[1];
    document.getElementById('pk2').appendChild(s2);
    document.getElementById('hp2').innerHTML = `<p>${pk2.name} <br> HP:'  ${pk2.hp} /  ${pk2.fullhp} </p>`;

    for (i = 0; i < 4; i++) {
        let btn = document.getElementById('m'+ i);
        let move = pk1.moves[i];

        function addHandler(btn, move, pk1, pk2) {
            btn.addEventListener('click', function(e) {
                b.play();
                attack(move, pk1, pk2, 'hp2', 'Matheus ');
                setTimeout(attack, 2000, pk2.moves[Math.floor(Math.random() * 3)], pk2, pk1, 'hp1', "Red's " );
            });
        }
        addHandler(btn, move, pk1 , pk2);
    }

    function attack(move, attacker, receiver, hp, owner) {
    	document.getElementById('comment').innerHTML ='<p>' + owner + attacker.name + ' used ' + move[0] + '!</p>';
        if(Math.random() < move[3]) {
             let power = move[2] += Math.floor(Math.random()*10);
             let rtype = typeMatch[receiver.name];
             let mtype = move[1];
             let scale = 1;

             for(i=0; i<rtype.length; i++){
                if(rtype[i].includes(mtype)){
                    switch(i){
                        case 0:
                        scale = 0; 
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML = '<p> It had no effect! </p>';
                        }, 1000);
                        break;

                        case 1: 
                        scale = 2; 
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML = '<p> It was super effective! </p>';
                        }, 1000);
                        break;

                        case 2:

                        scale = 0.5; 
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML ='<p> It was not very effective! </p>';
                        }, 1000);
                        break;
                    }

                    break;
                }
             }
             power *= scale;    
             receiver.hp -= Math.floor(power);
             document.getElementById(hp).innerHTML = `<p>HP: ${receiver.hp}/${receiver.fullhp}  </p>`;
        }
        else{
            setTimeout(function(){
                document.getElementById('comment').innerHTML = '<p> Attack missed! </p>';
            })
        }
        checkWinner(hp);
    };

    function checkWinner(hp){
        let f = (pk1.hp <= 0) ? pk1 : (pk2.hp <= 0) ? pk2 : false;
        if(f != false){
            document.getElementById(hp).innerHTML = `<p> HP: 0/${f.fullhp}</p>`;
            alert(`GAME OVER: ${f.name} fainted! `);

            setTimeout(function(){
                location.reload();
            });
        }

    };