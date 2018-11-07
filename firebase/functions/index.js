// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
const vowels = ['a', 'e', 'i', 'o', 'u']
const WELCOME_TITLE = "Welcome";
const PLAYING_TITLE = "Playing the Game";
const WRONG_GUESS_TITLE = " Wrong Guess Buddy";
const CORRECT_GUESS_TITLE = "Awesome";

const ALREADY_GUESSED_TITLE = "A letter of past";

/*
const HINT_TITLE = "Helping Hint"
const GIVE_UP_TITLE = "Oh Snap"
const WON_GAME_TITLE = "Impressive"

const WRONG_GUESS_SLANG = ["<say-as interpret-as='interjection'>arrey</say-as><break strength='strong'/>",
                     "<say-as interpret-as='interjection'>no way</say-as><break strength='strong'/>",
                     "<say-as interpret-as='interjection'>naah</say-as><break strength='strong'/>"]
const CORRECT_GUESS_SLANG = ["<say-as interpret-as='interjection'>ooh la la</say-as><break strength='strong'/>",
                       "<say-as interpret-as='interjection'>shabash</say-as><break strength='strong'/>",
                       "<say-as interpret-as='interjection'>waah</say-as><break strength='strong'/>",
                       "<say-as interpret-as='interjection'>wow</say-as><break strength='strong'/>"]
const ALREADY_GUESSED_SLANG = ["<say-as interpret-as='interjection'>yaar</say-as><break strength='strong'/>",
                         "<say-as interpret-as='interjection'>oh ho</say-as><break strength='strong'/>"]
const WON_GAME_SLANG = "<say-as interpret-as='interjection'>woo hoo</say-as><break strength='strong'/>"
const LOST_GAME_SLANG = "<say-as interpret-as='interjection'>aiyo</say-as><break strength='strong'/>"

const SMALL_IMAGE_URL = "https://s3.amazonaws.com/bollywoodgamebucket/Screenshot+2018-10-14+at+8.26.41+PM.png"
const LARGE_IMAGE_URL = "https://s3.amazonaws.com/bollywoodgamebucket/Screenshot+2018-10-14+at+8.27.06+PM.png"

const LAUNCH_MUSIC = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_intro_01'/>"
const NEGATIVE_GUESS = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_tally_negative_01'/>"
const POSITIVE_GUESS = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_tally_positive_01'/>"
const NEUTRAL_GUESS = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_neutral_response_03'/>"
const YES_PLAY_MUSIC = "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_bridge_02'/>"
const LOST_GAME_MUSIC = "<audio src='soundbank://soundlibrary/human/amzn_sfx_crowd_boo_02'/>"
const WON_GAME_MUSIC = "<audio src='soundbank://soundlibrary/human/amzn_sfx_crowd_applause_05'/>"

const SKILL_NAME = "Bollywood Game"
const vowels = ['a', 'e', 'i', 'o', 'u']

const SSML_PROSODY_START = "<prosody rate='slow'> <say-as interpret-as='spell-out'>"
const SSML_PROSODY_END = "</say-as></prosody><break strength='strong'/>"
const WELCOME_MSG = "Welcome to the Bollywood Game. You have played {} times till now. Would you like to play once more?"
const YES_NO_PROMPT = " Say yes to kick start or no to quit"
const SAY_LETTER_PROMPT = " Please guess a letter or a movie"
const GOODBYE = " Goodbye. Hope you come back! "
const YES_PLAY = " Okay so here it is. \n Guess this movie "
const CHANCES_LEFT = " You have {} chances left. "

const LOSE_CHANCE = " You lose a chance.\n "
const LAST_GUESS_COMING = " Your last guess is coming up. "

const VOWEL_GUESS = "You have guessed a vowel. I have already filled that up for you.\n"
const WRONG_MOVIE_GUESS = "No No No. Its not {}.\n Try another movie or letter.\n "
const ALREADY_GUESSED = " I remember you have guessed that letter already.\n"
const LOST_GAME = " You couldn't guess the movie {} correctly. Better luck next time." \
            " Would you like to play another game?"
const WRONG_LETTER_GUESS = "Sorry the letter {} isn't in the movie name.\n" \
                     "You lose a chance... the movie still looks like "
const RIGHT_LETTER_GUESS = "Yes the letter {} is in the movie name.\n The movie name now looks like "
const CORRECT_MOVIE_GUESS = "Oh Wow. You guessed the movie {} correctly in {} chances. \n Would you like to play it again?\n"
const CANT_GIVE_HINT_LAST = "Sorry this is your last chance. I can't help. Try it yourself"

GAVE_HINT = " I filled up the letter {} for you. But you loose a chance though. The movie looks like \n "
EXCEPTION = " Sorry, I can't understand that. Please say again!!"
UNHANDLED = " Say yes to continue or no to end the game!!"

HELP = "You will be given a movie name with only the vowels filled up. " \
       "Rest of the letters will be marked as underscore . You can guess a letter or a movie. " \
       "You will be given 9 chances to guess the movie correctly. " \
       "For every wrong guess you lose a chance. While you don't lose one if your guess is correct. " \
       "You can also ask for hint by saying give me a hint. " \
       "Would you like to play? "

FALLBACK = " The Bollywood game skill can't help you with that. You can say yes to play the game. "

MOVIE_LOOKS_LIKE = " The movie name looks like \n "

HERE_IS_HINT = " Here is your hint. "

ACTOR_HINT = " The actor in the movie is {}. "
ACTORS_HINT = " The actors of the movie are {}. "
DIRECTOR_HINT = " The director of the movie is {}. "
DIRECTORS_HINT = " The directors of the movie are {}. "
RELEASE_YEAR_HINT = " The release year of the movie is {}. "
SEQUEL_HINT = " The movie had {} sequels. "
GENRE_HINT = " The movie has genre {} "
CANT_GIVE_HINT = " Sorry I can't give more hints. "
*/
const {
 dialogflow,
  BasicCard,
  BrowseCarousel,
  BrowseCarouselItem,
  Button,
  Carousel,
  Image,
  LinkOutSuggestion,
  List,
  MediaObject,
  Suggestions,
  SimpleResponse,
  Table,
} = require('actions-on-google');




const functions = require('firebase-functions');
const admin = require('firebase-admin');

const firebaseApp = admin.initializeApp(config);
//const firebaseApp=admin.app("nikmul19");
const {
  WebhookClient
} = require('dialogflow-fulfillment');


const app = dialogflow({
  debug: true
});
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

app.intent("Default Welcome Intent", (conv) => {

  let prompt = "Can you say something?";
  conv.ask(`<speak>say yes or no</speak>`);
  conv.ask(new Suggestions('Yes', 'No'));

});

function readDb(snapshot) {




  let movieObject = snapshot.val();
  //console.log(movieObject.title);
  var movie = movieObject.title;
  console.log("in read db movie is" + movie);
  var say = "<speak> your movie is" + movie + "</speak>";


  var i = 0;
  /*for(i=0;i<movie.length;i++){
      if(movie[i]=="a" || movie[i]=="o" || movie[i]=="i" || movie[i]=="o" || movie[i]=="u"){
          movie=movie.replace(movie[i],"_")
      }
  }*/


}
const map={
    
    "4":{ title: 'Indigo Taco',
    text: 'Indigo Taco is a subtle bluish tone.',
    image: {
      url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDN1JRbF9ZMHZsa1k/style-color-uiapplication-palette1.png',
      accessibilityText: 'Indigo Taco Color',
    },
    display: 'WHITE',},
    
};
app.intent("Default Welcome Intent - yes", (conv) => {
  //var ref =db.ref("movies/"+(Math.round((Math.random()*1200)).toString()));

  var db = admin.database(firebaseApp);
  var ref = db.ref("movies/5/");
  var movie;
  var say = "before";




  return new Promise(function(resolve, reject) {

    // query the post class
    ref.once('value').then(function(snapshot) {

      var movieObject = snapshot.val();
      movie = movieObject.title;
      
      console.log(movie);
      conv.data.movieObject = movieObject;
      /*conv.data.directors = movieObject.Directors;
      conv.data.actors = movieObject.Actors;
      conv.data.genres = movieObject.Genre;
      conv.data.releaseYear = movieObject.ReleaseYear;
      */
      console.log(JSON.stringify(conv.data.movieObject));

      var i = 0;
      for (i = 0; i < movie.length; i++) {
        if (movie[i] == "a" || movie[i] == "o" || movie[i] == "i" || movie[i] == "o" || movie[i] == "u") {
          movie = movie.replace(movie[i], "_");
        }
      }
      conv.data.noOfGuesses=0;
      conv.data.lastGuess=false;
      
      conv.data.fillMovie=movie;
      say = "<speak> your movie is <say-as interpret-as='characters'>" + movie + "</say-as></speak>";
        conv.ask(say);
     conv.ask(new BasicCard({
    text: `The movie is ${movie}`,
    subtitle: 'This is a subtitle',
    title: 'Bollywood Game: Movie guess',
    
    image: new Image({
      url: SMALL_IMAGE_URL,
      alt: 'Image alternate text',
    }),
  }));
  console.log("set the card");
  
   resolve(say);
     

    });
   
  }); //.then here returns error

  // .then here returns empty array
});

app.intent("testIntent", (conv) => {
  //console.log(JSON.stringify(conv.data.movieObject));
    conv.ask(conv.data.noOfGuesses+ conv.data.fillMovie);
});
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
