# Narrative Audit — Phase 1

Date: 2026-09-06  
Scope: research claims only; no visual or layout changes made in this phase.

## Approved definition

> **Building Spatial Intelligence for the Physical World:** enabling AI to move from
> incomplete multimodal observations to persistent representations of dynamic physical
> spaces, reason about how entities relate and evolve, predict what happens next, and
> support grounded action.

The public framework is:

| Capability | Visitor question | Evidence boundary |
|---|---|---|
| **PERCEIVE** | What is there? | Published work establishes robust multimodal / wireless physical perception in agricultural sensing settings. |
| **REPRESENT** | Where is it and how is it related? | Published work establishes cross-modal knowledge transfer and physical-state reconstruction; a unified spatial relation representation remains an agenda. |
| **MODEL** | How is the world changing? | Published work estimates physical state and leaf wetness; persistent dynamic world modeling is not yet a published result on this homepage. |
| **REASON & PREDICT** | Why is it changing and what happens next? | Future research agenda; no published evidence is claimed. |
| **ACT** | What should the agent do? | Current human-centered driving safety work is an application bridge toward grounded action; it is not presented as a completed embodied-intelligence system. |

## Research trajectory

### Published Foundations — what the previous work establishes

Yimeng's published work forms a coherent foundation in physical observation and
representation:

1. **Reliable multimodal perception:** Hydra combines mmWave radar and RGB camera
   information for leaf-wetness detection. Its paper reports up to 96% accuracy in
   evaluated plant scenarios and around 90% in rainy, dawn, or poorly lit farm
   conditions. Source: [Hydra PDF](assets/files/hydra.pdf).
2. **Cross-modal knowledge transfer:** Proteus uses an RGB teacher to guide a mmWave
   SAR student, with noise reduction and phase-angle features. Its paper reports up
   to 96.3% accuracy across varied environmental scenarios. Source: [Proteus PDF](assets/files/proteus.pdf).
3. **Physical-state estimation:** Adonis introduces Leaf Wetness Level and estimates
   fine-grained wetness from mmWave signals. It reports MAE 4.43 in controlled
   conditions and 6.49 in real farm conditions, compared with 11.84 and 14.32 for
   traditional sensors. Source: [Adonis PDF](assets/files/adonis.pdf).
4. **Benchmarking and reproducibility:** Hydra-Bench contributes synchronized mmWave
   raw data, SAR images, and RGB images collected over six months across five plant
   species and controlled/outdoor environments. Source: [Hydra-Bench arXiv record](https://arxiv.org/abs/2507.22685).

These papers demonstrate sensing, cross-modal learning, and physical-state estimation.
They do not demonstrate a general-purpose persistent world model, spatial-relation
reasoning, future-state prediction, or a closed-loop embodied agent.

### Current Research — what is being built now

The current public project page documents human-centered driving safety research:
driving-simulator assessment, continuous in-car monitoring, realistic simulation tests,
and community education. Source: [Senior Driving project](project/senior-driving.md).

This is a credible bridge toward grounded action and safety-aware physical AI, but the
current repository contains no public artifact supporting the stronger homepage claim
of an LLM-grounded CARLA system. That claim must be removed or replaced until a
verifiable project page, paper, codebase, or result is added.

### Future Research Agenda — where the work is going

The long-horizon agenda is to turn multimodal observations into a persistent spatial
state, maintain entity identities and relations over time, model change, reason about
interaction, predict future states, and support grounded action. This is a research
direction, not retroactive evidence for the published papers.

## Project → capability claim matrix

| Project | Capability it can honestly evidence | Maturity | Approved public claim | Do not claim |
|---|---|---|---|---|
| Hydra | Multimodal perception under adverse conditions | Published Foundation | mmWave + RGB complement one another for physical sensing when visual conditions degrade. | A general human/vehicle perception model; “first” unless independently documented. |
| Proteus | Cross-modal learning / transfer | Published Foundation | An RGB teacher guides a mmWave SAR student, transferring useful features across modalities. | A complete unified 3D spatial representation or a general world model. |
| Adonis | Physical representation / state estimation | Published Foundation | mmWave signal processing and contrastive feature extraction estimate fine-grained Leaf Wetness Level. | A dynamic world model, broad sparse-observation reconstruction, or reasoning system. |
| Hydra-Bench | Multimodal benchmark / research infrastructure | Published Research Artifact | Synchronized raw mmWave, SAR, and RGB data support evaluation across modalities and environments. | A flagship Spatial Reasoning result. |
| Senior Driving Safety / Cognitive Driving direction | Human-centered sensing and safety-aware intervention bridge | Current Research | Simulator assessment and in-car monitoring explore earlier, safer support for older drivers. | LLM-grounded CARLA reasoning, completed action policy, or published embodied intelligence. |
| Dynamic spatial world modeling | Persistent state, relation tracking, prediction | Future Agenda | A long-term research direction built on the sensing foundations. | A capability already demonstrated by Hydra, Proteus, or Adonis. |

## Copy audit

### Keep

- “Building Spatial Intelligence for the Physical World” as the identity-level H1.
- The incomplete-observation → persistent-state → reasoning → action framing.
- The five visitor questions, because they make the research problem operational.
- Hydra, Proteus, Adonis, and the driving direction as distinct capability evidence.
- Explicit Published Foundation / Current Research / Future Agenda labels.

### Modify

- Replace the current `Cognitive Driving: LLM-grounded ... in CARLA` sentence with
  language grounded in the public senior-driving project page.
- Replace Proteus problem copy about slow/costly scanning with the paper-supported
  issue of mmWave SAR imaging quality and cross-modal guidance.
- Replace Adonis “wider scan distances” / “sparse RF observations” wording with the
  verified Leaf Wetness Level and mmWave physical-state estimation result.
- Add the quantitative results above to the evidence layer rather than relying on
  broad adjectives such as “faster, finer, and more robust.”
- Keep leaf wetness in paper titles and evidence captions, but remove it from the
  top-level research definition and trajectory headline.

### Remove or demote

- Any “first” claim that is not directly supported by a citable source.
- Any implication that the published sensing series already solved world modeling,
  spatial reasoning, prediction, or embodied action.
- The unsupported LLM / CARLA claim until a matching public artifact exists.
- Low-value homepage content that does not help the visitor understand identity,
  problem, demonstrated capability, current build, or future agenda.

## Required 60-second interpretation

> Yimeng Liu studies Spatial Intelligence: how AI can move from incomplete multimodal
> observations to persistent representations of dynamic physical spaces, understand
> relationships and change, predict what happens next, and ultimately support grounded
> action. His previous multimodal sensing and physical-state estimation work establishes
> the foundations; his current human-centered driving research provides a bridge toward
> safety-aware action; and his future research extends those foundations toward dynamic
> world models, spatial reasoning, prediction, and embodied intelligence.

## Phase 1 acceptance

- The definition is fixed and reusable across Hero, About, Vision, Featured Research,
  and future project pages.
- Every flagship has a capability, maturity label, evidence boundary, and prohibited
  overclaim.
- Published evidence is limited to claims supported by the local paper artifacts or
  verified public project / benchmark records.
- Current and future work are explicitly separated from published results.
- The unsupported LLM/CARLA driving claim is identified as a hard bug and scheduled
  for correction before Phase 4 evidence design.
