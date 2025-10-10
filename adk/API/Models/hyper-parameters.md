---
sidebar_position: 1
title: "Hyper Parameters"
---


# Hyper Parameters
Hyperparameters are configurable values set before training a model that govern the learning
process and affect its performance. Also useful as a reference to continue training or for
fine-tuning after initial training run(s). In the context of loading,
[Genie Models](adk\API\Models\genie-model.md) from `JSON` files, `hyperparameters` are represented
as key-value pairs within a dictionary.


## Definition
```py
hyperparameters: dict[str, Any]
```


## Example
An example of how to setup the values.
:::note
Note: There are no restrictions on how this object can be structured, and it is the developer's
responsibility to interpret and handle the structure accordingly. However, this object SHOULD contain
configuration parameters that control the learning process, such as learning rates, batch sizes,
discount factors, and other training-specific settings that remain constant during a training run
but may be adjusted between runs for optimization or experimentation.
:::
```json title="models/<Model Name>/hyper_parameters.json"
{
	"actor_lr": 0.00005,
	"critic_lr": 0.0003,

	"action_noise": 0.1,
	"target_interpolation": 0.995,
	"reward_discount": 0.99,
	"max_replay_size": 1000000,
	"batch_size": 256,

	"actor_delay": 2,
	"target_actor_noise": 0.001,
	"target_noise_clip": 0.001
}
```