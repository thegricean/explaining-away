function build_exposures() {
  var exposures = [];
  var version = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var cond = CONDITION;
  var check = [1, 0, 0, 0, 1];
  var order = [0, 1];

  randomVersion = _.shuffle(version);
  for (let i = 0; i < 5; i ++) {
    randomOrder = _.sample(order);
    var image = CONDITION == 1 || CONDITION == 2 ? "./stim/images/exposure_60_" + randomVersion[i + 1] + ".png" : "./stim/images/exposure_90_" + randomVersion[i + 1] + ".png";
    var oppositeImage = CONDITION == 1 || CONDITION == 2 ? "./stim/images/prob_100_1.png" : "./stim/images/exposure_25_" + randomVersion[i + 1] + ".png";
    exposures.push({
      "condtion": cond,
      "mood": CONDITION == 1 ? "optimist" : CONDITION == 3 ? "pessimist" : "control",
      "modal": "probably",
      "seat": "window",
      "request": "./stim/text/text-1.png",
      "audio": CONDITION == 1 ? "happy-probably1.mp3" : CONDITION == 3 ? "angry-probably1.mp3" : "control-probably1.mp3",
      "text": "You'll probably get a window seat",
      "catch_trial": check[i],
      "image": image,
      "order": randomOrder,
      "check1": randomOrder == 1 ? oppositeImage : image,
      "check2": randomOrder == 1 ? image : oppositeImage
    });
  }
  for (let i = 0; i < 5; i ++) {
    randomOrder = _.sample(order);
    var image = CONDITION == 1 || CONDITION == 2 ? "./stim/images/exposure_40_" + randomVersion[i + 1] + ".png" : "./stim/images/exposure_10_" + randomVersion[i + 1] + ".png";
    var oppositeImage = CONDITION == 1 || CONDITION == 2 ? "./stim/images/prob_100_1.png" : "./stim/images/exposure_75_" + randomVersion[i + 1] + ".png";
    exposures.push({
      "condtion": cond,
      "mood": CONDITION == 1 ? "optimist" : CONDITION == 3 ? "pessimist" : "control",
      "modal": "probably",
      "seat": "aisle",
      "request": "./stim/text/text-2.png",
      "audio": CONDITION == 1 ? "happy-probably2.mp3" : CONDITION == 3 ? "angry-probably2.mp3" : "control-probably2.mp3",
      "text": "You'll probably get a aisle seat",
      "catch_trial": check[i],
      "image": image,
      "order": randomOrder,
      "check1": randomOrder == 1 ? oppositeImage : image,
      "check2": randomOrder == 1 ? image : oppositeImage
    });
  }
  for (let i = 0; i < 5; i ++) {
    randomOrder = _.sample(order);
    var image = CONDITION == 1 || CONDITION == 2 ? "./stim/images/exposure_25_" + randomVersion[i + 1] + ".png" : "./stim/images/exposure_60_" + randomVersion[i + 1] + ".png";
    var oppositeImage = CONDITION == 1 || CONDITION == 2 ? "./stim/images/exposure_90_" + randomVersion[i + 1] + ".png" : "./stim/images/prob_100_1.png";
    exposures.push({
      "condtion": cond,
      "mood": CONDITION == 1 ? "optimist" : CONDITION == 3 ? "pessimist" : "control",
      "modal": "might",
      "seat": "window",
      "request": "./stim/text/text-1.png",
      "audio": CONDITION == 1 ? "happy-might1.mp3" : CONDITION == 3 ? "angry-might1.mp3" : "control-might1.mp3",
      "text": "You might get a window seat",
      "catch_trial": check[i],
      "image": image,
      "order": randomOrder,
      "check1": randomOrder == 1 ? oppositeImage : image,
      "check2": randomOrder == 1 ? image : oppositeImage
    });
  }
  for (let i = 0; i < 5; i ++) {
    randomOrder = _.sample(order);
    var image = CONDITION == 1 || CONDITION == 2 ? "./stim/images/exposure_75_" + randomVersion[i + 1] + ".png" : "./stim/images/exposure_40_" + randomVersion[i + 1] + ".png";
    var oppositeImage = CONDITION == 1 || CONDITION == 2 ? "./stim/images/exposure_10_" + randomVersion[i + 1] + ".png" : "./stim/images/prob_100_1.png";
    exposures.push({
      "condtion": cond,
      "mood": CONDITION == 1 ? "optimist" : CONDITION == 3 ? "pessimist" : "control",
      "modal": "might",
      "seat": "aisle",
      "request": "./stim/text/text-2.png",
      "audio": CONDITION == 1 ? "happy-might2.mp3" : CONDITION == 3 ? "angry-might2.mp3" : "control-might2.mp3",
      "text": "You might get an aisle seat",
      "catch_trial": check[i],
      "image": image,
      "order": randomOrder,
      "check1": randomOrder == 1 ? oppositeImage : image,
      "check2": randomOrder == 1 ? image : oppositeImage
    });
  }
  for (let i = 0; i < 5; i ++) {
    randomOrder = _.sample(order);
    var image = "./stim/images/prob_100_1.png";
    var oppositeImage = "./stim/images/exposure_60_" + randomVersion[i + 1] + ".png";
    exposures.push({
      "condtion": cond,
      "mood": CONDITION == 1 ? "optimist" : CONDITION == 3 ? "pessimist" : "control",
      "modal": "bare",
      "seat": "window",
      "request": "./stim/text/text-1.png",
      "audio": CONDITION == 1 ? "happy-bare.mp3" : CONDITION == 3 ? "angry-bare.mp3" : "control-bare.mp3",
      "text": "You'll a window seat",
      "catch_trial": check[i],
      "image": image,
      "order": randomOrder,
      "check1": randomOrder == 1 ? oppositeImage : image,
      "check2": randomOrder == 1 ? image : oppositeImage
    });
  }
  console.log(exposures[0])
  return exposures;
}
