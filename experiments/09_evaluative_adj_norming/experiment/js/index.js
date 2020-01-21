var REPETITIONS = 2
var SPEAKER = _.sample(["m", "f"])

var TEMPLATE_DICT = {
    "f": {
        "{{she}}" : "she",
        "{{her}}" : "her"
    }, "m": {
        "{{she}}" : "he",
        "{{her}}" : "his"
    }
}[SPEAKER];

var COMPLETIONS = [
    ["terrible", "... terrible."],
    ["bad", "... bad."],
    ["good", "... good."],
    ["amazing", "... amazing."],
];

var COMPLETIONS_WITH_OKAY = [
    ["terrible", "... terrible."],
    ["bad", "... bad."],
    ["okay", "... okay."],
    ["good", "... good."],
    ["amazing", "... amazing."],
];

if (INCLUDE_OKAY) {
  COMPLETIONS = COMPLETIONS_WITH_OKAY;
}

var N_COMPLETIONS = COMPLETIONS.length;

var trial_counter = 0;



function build_trials() {
  var trials = [];
  var ratings = [1, 2, 3, 4, 5, 6];
  var cond = CONDITION;
  var speaker = SPEAKER;
  var text_prompt = _.shuffle([
    "The croissants were ",
    "The red velvet cake was ",
    "The cinnamon rolls were ",
    "The lemon loaf was ",
    "The cheesecake was ",
    "The donuts were ",
    "The pecan pie was ",
    "The chocolate cake was ",
    "The bear claw was ",
    "The carrot cake was ",
    "The apple pie was ",
    "The blueberry lavender scone was ",
    "The chocolate chip cookies were ",
    "The cherry pie was "
  ]);
  var text_counter = 0;


  for (var j = 0; j < REPETITIONS; j ++) {
    for (var i = 0; i < ratings.length; i++) {

      var text_to_add = "";
      if (text_counter < text_prompt.length) {
        text_to_add = text_prompt[text_counter];
        text_counter ++;
      } else {
        text_counter = 0;
        text_to_add = text_prompt[text_counter];
        text_counter ++;
      }

      trials.push({
        "cond": cond,
        "text": text_to_add,
        "ratings": ratings[i],
        "rating text": ratings[i] + " star(s)",
        "speaker": speaker,
        "image": "./stim/" + ratings[i] + "_stars.png",
        "speaker-img": "./stim/eval-adj-person-" + speaker + ".png"
      })
    }
  }
  return trials;
}

function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.auth = slide({
    "name": "auth"
  });

  slides.instructions = slide({
    name : "instructions",
    start: function() {
      $(".err").hide();
      $("#instructions-speaker").attr("src", "./stim/eval-adj-person-" + SPEAKER + ".png");

      $("#instructions-part2").hide();
      $("#instructions-part3").hide();
      $("#instructions-speaker").hide();
      $("#rating-stuff").hide();
      
      this.step=1;
    },
    button : function(response) {
      if(this.step == 1) {
        $("#instructions-part1").hide();
        $("#instructions-part2").show();
        $("#instructions-speaker").show();
        this.step = 2;
      } else if (this.step == 2) {
        $("#instructions-part2").hide();
        $("#instructions-part3").show();
        $("#rating-stuff").show();
        this.step = 3;
      } else {
        exp.go();
      }
    }
  });

  slides.practice = slide({
    name: "practice",
    start: function() {
      $(".err").hide();
      $("#practice-speaker").attr("src", "./stim/eval-adj-person-" + SPEAKER + ".png");
      
      var callback = function () {
      
        var total = 0;
        for (var i = 1; i < (N_COMPLETIONS + 2); i++) {
          total += $("#practice_slider_" + i).slider("option", "value");
        }
        
        if (total > 1.0) {
          var other_total = total - $(this).slider("option", "value");
          $(this).slider("option", "value", 1 - other_total);
        }
      
        var perc = Math.round($(this).slider("option", "value") * 100);
        $("#" + $(this).attr("id") + "_val").val(perc);
      
      }
      
      for (var i = 0; i < (N_COMPLETIONS + 1); i++) {
        utils.make_slider("#practice_slider_" + (i+1), callback);
        if (i < N_COMPLETIONS) {
          $("#practice_sent_" + (i+1)).text(COMPLETIONS[i][1]);
        }
      }
      
    },
    button: function() {
      $(".err").hide();
      
      var total = 0;
      for (var i = 1; i < (N_COMPLETIONS + 2); i++) {
        total += $("#practice_slider_" + i).slider("option", "value");
      }
		
			if (total < .99) {
	      $(".err").show();
			} else {
      	this.log_responses();
				exp.go();
      }
    },
    
    log_responses: function() {
      for (var i = 0; i < N_COMPLETIONS; i++) {
        exp.data_trials.push({
            "trial_type": "practice",
            "trial" : -1,
            "sentence": COMPLETIONS[i][1],
            "adjective": COMPLETIONS[i][0],
            "response": $("#practice_slider_" + (i+1)).slider("option", "value"),
            "rating": 4,
            "condition" : CONDITION,
            "version" : SPEAKER,
            "text" : ""
        });
      }
      exp.data_trials.push({
          "trial_type": "practice",
          "trial" : -1,
          "sentence": "",
          "adjective": "other",
          "response": $("#practice_slider_" + (N_COMPLETIONS + 1)).slider("option", "value"),
          "rating": 4,
          "condition" : CONDITION,
          "version" : SPEAKER,
          "text" : ""
      });
    }
    
  });

  slides.separator = slide({
    name: "separator",
    start: function() {
      $(".button").show();
    },
    button: function() {
      exp.go();
    }
  });

  slides.trial = slide({
    name: "trial",
    present: exp.trials,
    present_handle: function(stim) {
      $(".err").hide();
      $("#adj-response-form").trigger("reset");

      this.stim = stim;
      $("#rating-image").attr("src", stim["image"]);
      $("#speaker-image").attr("src", stim["speaker-img"]);
      $("#rating-text").html(stim["text"] + " ______");

      $("#trial").fadeIn(700);
      
      var callback = function () {
      
        var total = 0;
        for (var i = 1; i < (N_COMPLETIONS + 2); i++) {
          total += $("#slider_" + i).slider("option", "value");
        }
        
        if (total > 1.0) {
          var other_total = total - $(this).slider("option", "value");
          $(this).slider("option", "value", 1 - other_total);
        }
      
        var perc = Math.round($(this).slider("option", "value") * 100);
        $("#" + $(this).attr("id") + "_val").val(perc);
      
      }
      
      for (var i = 0; i < (N_COMPLETIONS + 1); i++) {
        utils.make_slider("#slider_" + (i+1), callback);
        if (i < N_COMPLETIONS) {
          $("#sent_" + (i+1)).text(COMPLETIONS[i][1]);
        }
      }

    },
    button : function() {
      $(".err").hide();

      var total = 0;
      for (var i = 1; i < (N_COMPLETIONS + 2); i++) {
        total += $("#slider_" + i).slider("option", "value");
      }
    
      if (total < .99) {
        $(".err").show();
      } else {
        this.log_responses();
        var t = this;
        $("#trial").fadeOut(300, function() {
          window.setTimeout(function() {
            _stream.apply(t);
          }, 700);
        });    
    }
  },
  
  log_responses: function() {
    trial_counter++;
    for (var i = 0; i < N_COMPLETIONS; i++) {
      exp.data_trials.push({
          "trial_type": "trial", 
          "trial" : trial_counter,
          "sentence": COMPLETIONS[i][1],
          "adjective": COMPLETIONS[i][0],
          "response": $("#slider_" + (i+1)).slider("option", "value"),
          "rating": this.stim["ratings"],
          "condition" : this.stim["cond"],
          "version" : this.stim["speaker"],
          "text" : this.stim["text"]
      });
    }
    exp.data_trials.push({
        "trial_type": "trial", 
        "trial" : trial_counter,
        "sentence": "",
        "adjective": "other",
        "response": $("#slider_" + (N_COMPLETIONS + 1)).slider("option", "value"),
        "rating": this.stim["ratings"],
        "condition" : this.stim["cond"],
        "version" : this.stim["speaker"],
        "text" : this.stim["text"]
    });
  }
    
    
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });
  
  slides.auth = slide({
      "name": "auth",
      start: function() {

          $(".err").hide();
          // define possible speaker and listener names
          // fun fact: 10 most popular names for boys and girls
          var speaker = _.shuffle(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"])[0];
          var listener = _.shuffle(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Margaret"])[0];

          var story = speaker + ' says to ' + listener + ': "It\'s a beautiful day, isn\'t it?"'

          $("#check-story").text(story);
          $("#check-question").text("Who is " + speaker + " talking to?");
          this.trials = 0;
          this.listener = listener;

      },
      button: function() {
          this.trials++;
          $(".err").hide();
          resp = $("#check-input").val();
          if (resp.toLowerCase() == this.listener.toLowerCase()) {
              exp.go();
          } else {
              if (this.trials < 2) {
                  $("#check-error").show();
              } else {
                  $("#check-error-final").show();
                  $("#check-button").attr("disabled", "disabled");
              }
          }
      }
  });
  

  return slides;
}

/// init ///
function init() {
  exp.trials = _.shuffle(build_trials());
  exp.catch_trials = [];
  exp.condition = _.sample(["condition 1", "condition 2"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "auth", "instructions", "practice", "separator", "trial", 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length();
  $(".placeholder").each(function() {
    var key = $(this).text();
    $(this).text(TEMPLATE_DICT[key]);
  });


  //exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide


}
