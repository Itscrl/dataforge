# Question choice editorial audit

Reviewed 2026-11-06. This pass changes question choice text only, retaining IDs, correct answer positions, explanations, sources and option/explanation alignment.

Metric: a correct choice is flagged when its character count exceeds 1.5 times the mean length of the other choices. This heuristic finds a visible cue; it does not measure semantic validity or difficulty.

```json
{
  "edited": 81,
  "before": {
    "total": 104,
    "conspicuouslyLong": 81,
    "correctIsSoleLongest": 85,
    "meanCorrectLength": 72
  },
  "after": {
    "total": 104,
    "conspicuouslyLong": 0,
    "correctIsSoleLongest": 32,
    "meanCorrectLength": 43
  }
}
```

The edits remove unnecessary qualifiers from correct choices where the question and explanation already carry context. Selected distractors now use comparable specificity while retaining their original incorrect premise, so their existing explanations still apply. Concision is not a substitute for evaluating a scenario.

No correct choice remains above the 1.5× threshold. Some correct choices remain the longest; length alone no longer supplies the same reliable cue. The bank still benefits from more plausible distractors in future editorial passes, and this audit does not claim equal difficulty or independent subject-matter certification.

Validation: all 104 question IDs, prompts, answer-rotation logic inputs, per-choice explanations, overall explanations, sources and difficulty metadata were compared with HEAD; only option strings changed. All option arrays remain unique and aligned with their explanations.
