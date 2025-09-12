# BasePreprocessor API

The BasePreprocessor class provides hooks that can be overridden to implement preprocessing logic.

```python
ActionType = TypeVar("ActionType")
ObservationType = TypeVar("ObservationType")
 
class BasePreprocessor(ABC):
    def process_agent_data(self, agent_data: AgentData) -> AgentData:
        return agent_data
 
    def process_specification(self, specification: Specification) -> Specification:
        return specification
 
    def process_env_reset(
        self,
        observation: ObservationType,
        info: dict[str, Any]
    ) -> tuple[ObservationType, dict[str, Any]]:
        return observation, info
 
    def process_agent_step_data(self, step_data: StepData) -> StepData:
        return step_data
 
    def process_env_step(
        self,
        next_observation: ObservationType,
        reward: float,
        terminated: bool,
        truncated: bool,
        next_info: dict[str, Any]
    ) -> tuple[ObservationType, float, bool, bool, dict[str, Any]]:
        return next_observation, reward, terminated, truncated, next_info
```

### Methods

* **process_agent_data(agent_data: AgentData) -> AgentData** Modify agent-related data before it is used. See [AgentData documentation] for details on the AgentData structure.
* **process_specification(specification: Specification) -> Specification** Preprocess specifications before passing them to the agent. See [Specification documentation] for details on the Specification structure.
* **process_env_reset(observation, info)** Preprocess the observation and info returned when the environment is reset.
* **process_agent_step_data(step_data: StepData) -> StepData** Preprocess the agent's step data before it is sent to the environment.
* **process_env_step(next_observation, reward, terminated, truncated, next_info)** Preprocess the outputs returned from the environment after each step.