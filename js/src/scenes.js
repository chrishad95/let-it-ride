Crafty.scene('Loading', function() {

	Crafty.e('2D, DOM, Text')
	.text('Loading...')
	.attr({x: 0, y: Game.height()/2 - 24, w: Game.width() })
	.css($text_css);

	Crafty.load(["images/cards.png"],
		function () {

			// when the images are done loading....
			var card_map = {};

        	var cardvals = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
        	var cardsuits = ['C','D','H','S'];
        	var positions = {};


        	for (var i=0; i<cardsuits.length; i++){
        	     for (var j=0; j<cardvals.length; j++){
					card_map["spr_" + cardvals[j] + cardsuits[i]] = [j,i];
        	     }
        	 }

			//Crafty.sprite(79, 123, "images/cards.png", {"AC" : [0,0], "2C" : [1,0]});
			card_map['spr_back'] = [2,4];

			Crafty.sprite(79, 123, "images/cards.png", card_map );
			Crafty.scene('Game');
	});

});

Crafty.scene('Game', function() {
		this.letItRide = Crafty.bind('LetItRide', function () {

		});

		this.nextState = Crafty.bind('NextState', function () {
			switch(this.gameState) {
				case "deal":
					this.dealerCards[0].value = this.deck.shift();
					this.dealerCards[0].entity = Crafty.e('2D, Mouse, Canvas, spr_' + this.dealerCards[0].value)
						.attr({
							x: 0,
							y: 0,
							w: 79,
							h: 123 
							}) ;
					this.gameState = "first card";
					break;
				case "first card":
					this.dealerCards[1].value = this.deck.shift();
					this.dealerCards[1].entity = Crafty.e('2D, Mouse, Canvas, spr_' + this.dealerCards[1].value)
						.attr({
							x: 80,
							y: 0,
							w: 79,
							h: 123 
							}) ;

					this.gameState = "last card";
					break;
			}
			console.log(this.dealerCards);

			console.log("Hand Rank: " + rank_cards(this.myCards.concat(this.dealerCards)));
		});

		this.gameState = 'deal';
		this.money = 100;
		this.bet = 5;

		this.deck = Game.setupDeck();
		this.myCards = [];
		this.myCards[0] = {value: this.deck.shift()};
		this.myCards[1] = {value: this.deck.shift()};
		this.myCards[2] = {value: this.deck.shift()};

		this.dealerCards = [];

		mycard_vals = [];
		mycard_vals.push(this.myCards[0].value);
		mycard_vals.push(this.myCards[1].value);
		mycard_vals.push(this.myCards[2].value);

		console.log('Hand Rank:' + rank_cards(this.myCards));

		var cardCounter = 0;

		for (var c in this.myCards) {

			console.log(this.myCards[c].value);
			this.myCards[c].entity = Crafty.e('2D, Mouse, Canvas, spr_' + this.myCards[c].value)
			.attr({
				x: cardCounter * 79,
				y: 124,
				w: 79,
				h: 123 
				});
			this.myCards[c].entity.bind('Click', function(e) {
				
					Crafty.trigger('NextState', this);
				     console.log("Clicked!!");
				 });
			cardCounter++;
		}

		// place the dealer cards

		this.dealerCards[0] = {value: ""};

		this.dealerCards[0].entity = Crafty.e('2D, Canvas, spr_back')
		.attr({
			x: 0,
			y: 0,
			w: 79,
			h: 123 
			}) ;

		this.dealerCards[1] = {value: ""};
		this.dealerCards[1].entity = Crafty.e('2D, Canvas, spr_back')
		.attr({
			x: 80,
			y: 0,
			w: 79,
			h: 123 
			}) ;

		// create buttons

		this.letItRideButton = Crafty.e('2D,Canvas,Color').color('Gray')
			.attr({
				x: 0,
				y: 260,
				w: 200,
				h: 75
				});
		this.letItRideButton.attach(
			Crafty.e("2D, Canvas, Text").attr({ x: 0, y: 0, w:180, h:50 }).text("Let it ride!")	
		);
		this.moneyText = Crafty.e("2D, Canvas, Text")
			.attr({x: 700, y:20, w:100, h:40})
			.text( this.money);

		





}, function() {
	this.unbind('NextState', this.nextState);
});

