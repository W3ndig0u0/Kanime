	let Card = document.getElementsByClassName("ImgCardSlider")
	let Cards = Math.ceil(Card.length/5);
	let left = 0;
	let movePer = 300;
	let maxMove = 5000;

	let mob_view = window.matchMedia("(max-width: 768px)");
	if (mob_view.matches)
	 {
	 	movePer = 200;
	 	maxMove = 5000;
	 }

	let NextSlider = ()=>{
		left = left + movePer;

		if (Card == 1)
    {
      left = 0; 
    }

		for(const i of Card)
		{
			if (left > maxMove)
      {
        left = left - movePer;
      }
			i.style.left = '-' + left + '%';
		}
	}

	let PrevSlider = ()=>{
		left = left - movePer;
		if (left <= 0)
    {
      left = 0;
    }

		for(const i of Card){
			if (Cards > 1)
      {
				i.style.left = '-' + left + '%';
			}
		}
	}