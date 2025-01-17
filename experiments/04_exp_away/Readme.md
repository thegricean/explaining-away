# Explaining away effects and semantic adaptation

Each participant sees a pair of speakers, a customer and an airline representative, along with a seat map demonstrating the probability of a certain outcome. In the first part of the experiment, the exposure phase, the participant is asked to look at the seat map and listen carefully to a recording of the airline representative responding to a customer's request. In the cautious and pessimistic conditions the speakers see the same language usage, but the pessimistic speaker is told that the flight attendant is in a particularly bad mood that day. In the second part of the experiment, the participant is asked to respond to the customer as they think the flight attendant would. The participants are asked to rate each of the pair of responses based on how likely they think it is that they would use a particular uncertainty expression.

## Participants

MTurk participants with US IP addresses and >95% approval. In total we collect data from 240 particpants.

## Exclusion Criteria

We exclude participants who seem to provide random ratings independent of the scene that they are seeing. We quantify this by computing the mean rating for each utterance across all trials for each participant and computing the correlation between a participant's actual ratings and their mean rating. A high correlation is unexpected and indicates that a participant chose ratings at random. We therefore also exclude the data from participants for whom this correlation is larger than 0.75.


## Procedure

See the following web-based experiments:

Condition 1:
https://i-loder-matthew.github.io/explaining-away/experiments/04_exp_away/experiment/cond-2

Condition 2:
https://i-loder-matthew.github.io/explaining-away/experiments/04_exp_away/experiment/cond-3

Condition 3:
https://i-loder-matthew.github.io/explaining-away/experiments/04_exp_away/experiment/cond-4

## Predictions

We predict first that the difference in AUC between the might ratings and the probably ratings will be significantly higher when the speakers are providing ratings for a cautious speaker than when they are providing ratings for a confident speaker, establishing that adaptation occurs. 

We predict further that the difference in AUC between the might ratings and the probably rating will be significantly higher when the speakers are providing ratings for a cautious speaker (without explanation) than when they are providing ratings for a pessimistic context.   

## Analysis

See analysis/analysis.Rmd for the exact analysis procedures.

## Pilot

We conducted a pilot with 40 total participants (10 in each of four conditions). On the basis of the performance in the pilot, we've decided to proceed with this experiment in three of the original four conditions. We will not be using the data from the pilot in our main analysis.
