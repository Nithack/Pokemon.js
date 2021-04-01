    
    // Quando é o mesmo pokemon a barra de hp nao funciona direito

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

    function disableBtns(){
        for(i=0; i>4; i++){
            var d = document.getElementById('m'+i);
            d.setAttribute('nome','queijo');
        }
    }

    function enableBtns(){
        for(i=0; i>4; i++){
            var d = document.getElementById('m'+i);
            d.disable= false;
        }
    }

    var moveColor = () => {

    }

    function spawn(bool){
    	let p = pkmList[Math.floor(Math.random()*pkmList.length)];
    	let pkm = new Pokemon(p[0], p[1], p[2], p[3]);
    	return(pkm);
    };

    let pk1 = spawn(true);


    let s1 = document.createElement('img');
    s1.src = pk1.sprite[0];
    document.getElementById('pk1').appendChild(s1);

    document.getElementById('hp1').innerHTML = '<p> HP:' + pk1.hp + '/' + pk1.fullhp + '</p>';

    const bar1 = document.createElement('progress');
    bar1.value = pk1.hp;
    bar1.max = pk1.fullhp;
    bar1.id = pk1.name;
    document.getElementById('hpbar1').appendChild(bar1);





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

    function disableBt(){
        document.getElementById("m0").disabled = true;
        document.getElementById("m1").disabled = true;
        document.getElementById("m2").disabled = true;
        document.getElementById("m3").disabled = true;
    }

    function enableBt(){
        document.getElementById("m0").disabled = false;
        document.getElementById("m1").disabled = false;
        document.getElementById("m2").disabled = false;
        document.getElementById("m3").disabled = false;
    }

   

   

    var pk2 = spawn(false);

    do{
        console.log('são iguais');
        pk2 = spawn(false); 
    } while(pk1.name == pk2.name);

    let s2 = document.createElement('img');
    s2.src = pk2.sprite[1];
    document.getElementById('pk2').appendChild(s2);
    document.getElementById('hp2').innerHTML = '<p> HP:' + pk2.hp + '/' + pk2.fullhp + '</p>';

    const bar2 = document.createElement('progress');
    bar2.value = pk2.hp;
    bar2.max = pk2.fullhp;
    bar2.id = pk2.name;
    document.getElementById('hpbar2').appendChild(bar2);


    for (i = 0; i < 4; i++) {
        let btn = document.getElementById('m'+ i);
        let move = pk1.moves[i];

        function addHandler(btn, move, pk1, pk2) {
            btn.addEventListener('click', function(e) {             
                attack(move, pk1, pk2, 'hp2', 'Matheus ');
                b.play();
                disableBt();
                setTimeout(attack, 2000, pk2.moves[Math.floor(Math.random() * 3)], pk2, pk1, 'hp1', "Red's " );
                setTimeout(enableBt,4000);
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
                            document.getElementById('comment').innerHTML = '<p> Não teve efeito nenhum! </p>';
                        }, 1000);
                        break;

                        case 1: 
                        scale = 2; 
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML = '<p> Foi super efetivo! </p>';
                        }, 1000);
                        break;

                        case 2:

                        scale = 0.5; 
                        setTimeout(function(){
                            document.getElementById('comment').innerHTML ='<p> Não foi muito efetivo! </p>';
                        }, 1000);
                        break;
                    }

                    break;
                }
             }
             power *= scale;    
             receiver.hp -= Math.floor(power);
             document.getElementById(hp).innerHTML = `<p>HP: ${receiver.hp}/${receiver.fullhp}  </p>`;
             document.getElementById(receiver.name).value = receiver.hp;
        }
        else{
            setTimeout(function(){
                document.getElementById('comment').innerHTML = '<p> Errou o ataque!</p>';
            },1000);
        }
        checkWinner(hp);
    };

    function checkWinner(hp){
        if(pk1.hp <= 0){

            document.getElementById('hp1').innerHTML = `<p>HP:0/${pk1.fullhp} </p>`
            setTimeout(()=>{
                alert('Seu '+ pk1.name +' perdeu a batalha! Você foi enviado para o centro Pokemon.');
                location.reload();
            },1000)
            ;}

        if(pk2.hp <= 0){

            document.getElementById('hp2').innerHTML = `<p>HP:0/${pk2.fullhp} </p>`
            setTimeout(()=>{
                alert('O inimigo '+ pk2.name +' perdeu a batalha! A insígnia do ginásio é sua!.');
                location.reload();
            },1000)
            ;}

        

    };




    
   
    