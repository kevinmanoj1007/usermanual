---
sidebar_position: 2
---

# Running on the cloud
After following the [quick start](getting-started#quick-start), you should now have an agent up on the platform,
you can see this if you click on the agent selection dialogue in the **Genie** tab of any project:

![Your model in the selection dialogue](../../static/img/selecting-myagent-model.png "Model visible in the selection dialogue")

Select your model in the selection dialogue and define some valid expressions e.g.:
![Selected model](../../static/img/selected-myagent-model.png "Selected MyAgent-model model")
![Valid expressions](../../static/img/valid-expressions.png "Valid expressions")

And **start the optimization** with:

![Genie Optimize button](../../static/img/genie-optimize-button.png "The Genie Optimize button")

If you come back to the console where you started the agent, you will see something like the following:
```sh
yyyy-mm-dd hh:mm:ss,ms - INFO:     [...]
yyyy-mm-dd hh:mm:ss,ms - INFO:     Total reward in run: x
yyyy-mm-dd hh:mm:ss,ms - INFO:     Steps taken: 1, Average steps: 0
yyyy-mm-dd hh:mm:ss,ms - INFO:     Episode: 1, Score: x, Average score: x

yyyy-mm-dd hh:mm:ss,ms - INFO:     	All targets have not been satisfied, truncating...
yyyy-mm-dd hh:mm:ss,ms - INFO:     [...]
yyyy-mm-dd hh:mm:ss,ms - INFO:     Total reward in run: y
yyyy-mm-dd hh:mm:ss,ms - INFO:     Steps taken: 1, Average steps: 0
yyyy-mm-dd hh:mm:ss,ms - INFO:     Episode: 2, Score: y, Average score: y

yyyy-mm-dd hh:mm:ss,ms - INFO:     	All targets have not been satisfied, truncating...
yyyy-mm-dd hh:mm:ss,ms - INFO:     [...]
yyyy-mm-dd hh:mm:ss,ms - INFO:     Total reward in run: z
yyyy-mm-dd hh:mm:ss,ms - INFO:     Steps taken: 1, Average steps: 0
yyyy-mm-dd hh:mm:ss,ms - INFO:     Episode: 3, Score: z, Average score: z
```

Congratulations! you have successfully started on optimization. You can stop it at any time by hitting the
`Stop Optimization` button that appeared in-place of the `Genie Optimize` button. Next let's look at the basics
of how to develop and modify agents with the ADK.