'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > h1');
    const scoreText = document.querySelector('#result > p');

    const quizSet = shuffle([
        {q: 'ねこが食べちゃいけないものは？' , c: ['たまねぎ', 'ささみ' ,'きゃべつ' , '生卵']},
        {q: 'ねこが嫌がらないことは？' , c: ['腰をトントン', '体が濡れる' ,'初めましての人' , 'トイレが汚い']},
        {q: 'ねこがふみふみしているときの気持ちで間違っているのは？' , c: ['むかつく〜', 'かまって〜' ,'ねむい〜' , '落ち着く〜']},
        {q: 'ねこがすりすりするときの気持ちは？' , c: ['においつけとこ', 'いいにおいするやん','はやくあそぼ','かゆい' ]},
        {q: 'ねこがしっぽをぶんぶん振るときの気持ちは？' , c: ['イライラ', '興奮してきた！' ,'たのしい' , 'お腹すいた']},
        {q: 'ねこがゴロンしてお腹を見せるときの気持ちは？' , c: ['こっち見て！', 'つかれた！' ,'お腹すいた！' , 'ねむい！']},
        {q: 'ねこが耳を伏せたときの気持ちは？' , c: ['こわい', '集中！' ,'イライラ' , 'びっくり']},
        {q: 'ねこがゆっくり瞬きしているときの気持ちは？' , c: ['だいすき', 'ねむい' ,'きらい' , 'イライラ']},
        {q: 'ねこ「ア〜オ〜」と鳴くときの気持ちは？' , c: ['ムラムラする〜', 'かまって〜' ,'お腹すいた〜' , 'イライラする〜']},
        {q: 'ねこがしっぽをピーンとしているときの気持ちで間違っているのは？' , c: ['警戒！', '嬉しい！' ,'喜び！' , 'かまって！']},
    ]);

    
    let currentNum = 0;
    let isAnswerd; 
    let score =0;

        function shuffle(arr) {         
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() *  (i + 1));
                [arr[j],arr[i]]=[arr[i],arr[j]];
            }
            return arr;
        }
    
    function checkAnswer(li) {
        if (isAnswerd === true) {
            return;
        }
        

        if(li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            btn.classList.remove('disabled');
            score = score + 10;
        } else {
            li.classList.add('wrong');
            score = score - 2.5;

        }        
    }

    function setQuiz() {
        isAnswerd = false;
        question.textContent = quizSet[currentNum].q;

        while (choices.firstChild){
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click' , () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });

        if (currentNum === quizSet.length -1) {
        btn.textContent = '成績をみる';
        }
    }


setQuiz();

btn.addEventListener('click' , () => {
    if(btn.classList.contains('disabled')){

        return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length -1) {
        scoreLabel.textContent = `あなたのねこ理解度は...${score}％`;
        result.classList.remove('hidden');
    }else{
        currentNum++;
        setQuiz();
    }

    if(90 <= score && score <= 100){
        scoreText.textContent =`あなたはねこの良き理解者です。ねこからの信頼も厚いので、今後も良い関係が築けるでしょう。`;
    }else if(80 <= score && score <= 89){
        scoreText.textContent =`あなたはねこといい友達です。基本的に害がないいいやつとして見られているでしょう。`;
    }else if(60 <= score && score <= 79){
        scoreText.textContent =`あなたはねこをぼちぼち分かっています。しかしねこは気まぐれなので、まだまだ好かれる努力を続けてください。`;
    }else{
        scoreText.textContent =`あなたはねこの敵とみなされています。ねこ様に好かれるためには努力が必要です。まずは気持ちを汲み取れるよう観察からはじめてみましょう。`;
    }
});

}