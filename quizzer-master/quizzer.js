
// 1
var questions = [
	[
		"¿Que funciones cumplen las enzimas?",
		"Realizan sustrato",
		"Son sustancias orgánicas",
		"Regula velocidad de la reacción",
		"Acelera o atrasa reacciones en la celula",
		3
	],
	[
		"¿Cuantos tipos de celulas hay?",
		"2",
		"3",
		"4",
		"Ninguno de los anteriores",
		0
	],
	[
		"¿Que celulas son?",
		"Eucariota y Animal",
		"Procariota y Fungi",
		"Procariota y Eucariota",
		"Eucariota, Procariota y Animal",
		2
	],
	[
		"¿Que es la glucosa?",
		"Nose",
		"Es combustible",
		"Son bacterias",
		"Es un monosacarido",
		3
	],
	[
		"¿Cual es la teoria que plantea Aristoteles?",
		"Teoria de la evolucion por seleccion natural",
		"Teoria endosimbiotica",
		"Teoria de la abstraccion",
		"Teria de la evolucion prebiotica",
		2
	],
	[
		"¿Cuantos tipos de hifas hay?",
		"1",
		"¿Que es eso?",
		"2",
		"No se",
		2
	],
	[
		"¿Que hongo hemos estado estudiando?",
		"Aspergillus",
		"Aspergilus",
		"¿Hongos? ¿Que es eso?",
		"Asperilus",
		0
	],
	[
		"¿Que es el fenotipo?",
		"No lo se",
		"El genotipo",
		"Un cruzamiento de esporas",
		"La exprecion del genotipo",
		3
	],
	[
		"¿Cual es el cuerpo del hongo?",
		"No lo se",
		"hifa",
		"Micelio",
		"Conidioforo",
		2
	],
	[
		"¿Como se llama la profesora de Biologia?",
		"Leticia Gismero",
		"Leticia Gismeros",
		"Letisia Gismeros",
		"Rosita Gismero",
		0
	],
];

// 2
var questionTemplate = _.template(" \
	<div class='card question'><span class='question'><%= question %></span> \
      <ul class='options'> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='0' id='q<%= index %>o1'> \
          <label for='q<%= index %>o1'><%= a %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='1' id='q<%= index %>o2'> \
          <label for='q<%= index %>o2'><%= b %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='2' id='q<%= index %>o3'> \
          <label for='q<%= index %>o3'><%= c %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='3' id='q<%= index %>o4'> \
          <label for='q<%= index %>o4'><%= d %></label> \
        </li> \
      </ul> \
    </div> \
    ");


// 3
var points,
	pointsPerQuestion,
	currentQuestion,
	questionTimer,
	timeForQuestion = 10, // seconds
	timeLeftForQuestion;

// 4
$(function() {

	//
	$('button.start').click(start);
	$('.play_again button').click(restart);


	function restart() {
		points = 0;
		pointsPerQuestion = 3;
		currentQuestion = 0 ;
		timeLeftForQuestion = timeForQuestion;

		$('.finish.card').hide();
		$('div.start').show();
		$('.times_up').hide();

		generateCards();
		updateTime();
		updatePoints();
	}

	//
	function start() {
		$('div.start').fadeOut(200, function() {
			moveToNextQuestion();
		});
	}

	//
	function generateCards() {
		$('.questions').html('');
		for (var i = 0; i < questions.length; i++) {
			var q = questions[i];
			var html = questionTemplate({
				question: q[0],
				index: i,
				a: q[1],
				b: q[2],
				c: q[3],
				d: q[4]
			});
			$('.questions').append(html);
		};
		$('.question.card input').change(optionSelected);
	}

	//
	function moveToNextQuestion() {
		currentQuestion += 1;
		if (currentQuestion > 1) {
			$('.question.card:nth-child(' + (currentQuestion-1) + ')').hide();
		}
		showQuestionCardAtIndex(currentQuestion);
		setupQuestionTimer();
	}

	//
	function setupQuestionTimer() {
		if (currentQuestion > 1) {
			clearTimeout(questionTimer);
		}
		timeLeftForQuestion = timeForQuestion;
		questionTimer = setTimeout(countdownTick, 1000);
	}

	//
	function showQuestionCardAtIndex(index) { // staring at 1
		var $card = $('.question.card:nth-child(' + index + ')').show();
	}

	//
	function countdownTick() {
		timeLeftForQuestion -= 1;
		updateTime();
		if (timeLeftForQuestion == 0) {
			return finish();
		}
		questionTimer = setTimeout(countdownTick, 1000);
	}

	//
	function updateTime() {
		$('.countdown .time_left').html(timeLeftForQuestion + 's');
	}

	//
	function updatePoints() {
		$('.points span.points').html(points + ' puntos');
	}

	//
	function optionSelected() {
		var selected = parseInt(this.value);
		var correct = questions[currentQuestion-1][5];

		if (selected == correct) {
			points += pointsPerQuestion;
			updatePoints();
			correctAnimation();
		} else {
			wrongAnimation();
		}

		if (currentQuestion == questions.length) {
			clearTimeout(questionTimer);
			return finish();
		}
		moveToNextQuestion();
	}


	function correctAnimation() {
		animatePoints('right');
	}

	//
	function wrongAnimation() {
		animatePoints('wrong');
	}

	//
	function animatePoints(cls) {
		$('header .points').addClass('animate ' + cls);
		setTimeout(function() {
			$('header .points').removeClass('animate ' + cls);
		}, 500);
	}

	//
	function finish() {
		if (timeLeftForQuestion == 0) {
			$('.times_up').show();
		}
		$('p.final_points').html(points + ' puntos');
		$('.question.card:visible').hide();
		$('.finish.card').show();
	}

	//
	restart();

});
