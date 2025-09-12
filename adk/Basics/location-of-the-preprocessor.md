# Location of the Preprocessor

Each Genie model may optionally include its own preprocessor file, located at:
```
models/<model_name>/preprocessor.py
```

If this file is present, it will be loaded automatically by the platform when the Genie model is initialized.

If no preprocessor file is found, a default identity preprocessor (which performs no modifications) is used instead.