/**
 * This is an importable library that contains information about all general augmentations
 * that exist in the game. The data is taken directly from the game's source code.
 * 
 * Importables:
 * generalAugLibrary
**/


// List of augmentation names pulled straight from the source code and converted to an object.
const augNames = {
	Targeting1: "Augmented Targeting I",
	Targeting2: "Augmented Targeting II",
	Targeting3: "Augmented Targeting III",
	SyntheticHeart: "Synthetic Heart",
	SynfibrilMuscle: "Synfibril Muscle",
	CombatRib1: "Combat Rib I",
	CombatRib2: "Combat Rib II",
	CombatRib3: "Combat Rib III",
	NanofiberWeave: "Nanofiber Weave",
	SubdermalArmor: "NEMEAN Subdermal Weave",
	WiredReflexes: "Wired Reflexes",
	GrapheneBoneLacings: "Graphene Bone Lacings",
	BionicSpine: "Bionic Spine",
	GrapheneBionicSpine: "Graphene Bionic Spine Upgrade",
	BionicLegs: "Bionic Legs",
	GrapheneBionicLegs: "Graphene Bionic Legs Upgrade",
	SpeechProcessor: "Speech Processor Implant",
	TITN41Injection: "TITN-41 Gene-Modification Injection",
	EnhancedSocialInteractionImplant: "Enhanced Social Interaction Implant",
	BitWire: "BitWire",
	ArtificialBioNeuralNetwork: "Artificial Bio-neural Network Implant",
	ArtificialSynapticPotentiation: "Artificial Synaptic Potentiation",
	EnhancedMyelinSheathing: "Enhanced Myelin Sheathing",
	SynapticEnhancement: "Synaptic Enhancement Implant",
	NeuralRetentionEnhancement: "Neural-Retention Enhancement",
	DataJack: "DataJack",
	ENM: "Embedded Netburner Module",
	ENMCore: "Embedded Netburner Module Core Implant",
	ENMCoreV2: "Embedded Netburner Module Core V2 Upgrade",
	ENMCoreV3: "Embedded Netburner Module Core V3 Upgrade",
	ENMAnalyzeEngine: "Embedded Netburner Module Analyze Engine",
	ENMDMA: "Embedded Netburner Module Direct Memory Access Upgrade",
	Neuralstimulator: "Neuralstimulator",
	NeuralAccelerator: "Neural Accelerator",
	CranialSignalProcessorsG1: "Cranial Signal Processors - Gen I",
	CranialSignalProcessorsG2: "Cranial Signal Processors - Gen II",
	CranialSignalProcessorsG3: "Cranial Signal Processors - Gen III",
	CranialSignalProcessorsG4: "Cranial Signal Processors - Gen IV",
	CranialSignalProcessorsG5: "Cranial Signal Processors - Gen V",
	NeuronalDensification: "Neuronal Densification",
	NeuroreceptorManager: "Neuroreceptor Management Implant",
	NuoptimalInjectorImplant: "Nuoptimal Nootropic Injector Implant",
	SpeechEnhancement: "Speech Enhancement",
	FocusWire: "FocusWire",
	PCDNI: "PC Direct-Neural Interface",
	PCDNIOptimizer: "PC Direct-Neural Interface Optimization Submodule",
	PCDNINeuralNetwork: "PC Direct-Neural Interface NeuroNet Injector",
	PCMatrix: "PCMatrix",
	ADRPheromone1: "ADR-V1 Pheromone Gene",
	ADRPheromone2: "ADR-V2 Pheromone Gene",
	ShadowsSimulacrum: "The Shadow's Simulacrum",
	HacknetNodeCPUUpload: "Hacknet Node CPU Architecture Neural-Upload",
	HacknetNodeCacheUpload: "Hacknet Node Cache Architecture Neural-Upload",
	HacknetNodeNICUpload: "Hacknet Node NIC Architecture Neural-Upload",
	HacknetNodeKernelDNI: "Hacknet Node Kernel Direct-Neural Interface",
	HacknetNodeCoreDNI: "Hacknet Node Core Direct-Neural Interface",
	NeuroFluxGovernor: "NeuroFlux Governor",
	Neurotrainer1: "Neurotrainer I",
	Neurotrainer2: "Neurotrainer II",
	Neurotrainer3: "Neurotrainer III",
	Hypersight: "HyperSight Corneal Implant",
	LuminCloaking1: "LuminCloaking-V1 Skin Implant",
	LuminCloaking2: "LuminCloaking-V2 Skin Implant",
	HemoRecirculator: "HemoRecirculator",
	SmartSonar: "SmartSonar Implant",
	PowerRecirculator: "Power Recirculation Core",
	QLink: "QLink",
	TheRedPill: "The Red Pill",
	SPTN97: "SPTN-97 Gene Modification",
	HiveMind: "ECorp HVMind Implant",
	CordiARCReactor: "CordiARC Fusion Reactor",
	SmartJaw: "SmartJaw",
	Neotra: "Neotra",
	Xanipher: "Xanipher",
	nextSENS: "nextSENS Gene Modification",
	OmniTekInfoLoad: "OmniTek InfoLoad",
	PhotosyntheticCells: "Photosynthetic Cells",
	Neurolink: "BitRunners Neurolink",
	TheBlackHand: "The Black Hand",
	UnstableCircadianModulator: "Unstable Circadian Modulator",
	CRTX42AA: "CRTX42-AA Gene Modification",
	Neuregen: "Neuregen Gene Modification",
	CashRoot: "CashRoot Starter Kit",
	NutriGen: "NutriGen Implant",
	INFRARet: "INFRARET Enhancement",
	DermaForce: "DermaForce Particle Barrier",
	GrapheneBrachiBlades: "Graphene BrachiBlades Upgrade",
	GrapheneBionicArms: "Graphene Bionic Arms Upgrade",
	BrachiBlades: "BrachiBlades",
	BionicArms: "Bionic Arms",
	SNA: "Social Negotiation Assistant (S.N.A)",
	HydroflameLeftArm: "Hydroflame Left Arm",
	CongruityImplant: "nickofolas Congruity Implant",
	EsperEyewear: "EsperTech Bladeburner Eyewear",
	EMS4Recombination: "EMS-4 Recombination",
	OrionShoulder: "ORION-MKIV Shoulder",
	HyperionV1: "Hyperion Plasma Cannon V1",
	HyperionV2: "Hyperion Plasma Cannon V2",
	GolemSerum: "GOLEM Serum",
	VangelisVirus: "Vangelis Virus",
	VangelisVirus3: "Vangelis Virus 3.0",
	INTERLINKED: "I.N.T.E.R.L.I.N.K.E.D",
	BladeRunner: "Blade's Runners",
	BladeArmor: "BLADE-51b Tesla Armor",
	BladeArmorPowerCells: "BLADE-51b Tesla Armor: Power Cells Upgrade",
	BladeArmorEnergyShielding: "BLADE-51b Tesla Armor: Energy Shielding Upgrade",
	BladeArmorUnibeam: "BLADE-51b Tesla Armor: Unibeam Upgrade",
	BladeArmorOmnibeam: "BLADE-51b Tesla Armor: Omnibeam Upgrade",
	BladeArmorIPU: "BLADE-51b Tesla Armor: IPU Upgrade",
	BladesSimulacrum: "The Blade's Simulacrum",

	StaneksGift1: "Stanek's Gift - Genesis",
	StaneksGift2: "Stanek's Gift - Awakening",
	StaneksGift3: "Stanek's Gift - Serenity",

	// Infiltrators MiniGames
	MightOfAres: "SoA - Might of Ares", // slash
	WisdomOfAthena: "SoA - Wisdom of Athena", // bracket
	TrickeryOfHermes: "SoA - Trickery of Hermes", // cheatcode
	BeautyOfAphrodite: "SoA - Beauty of Aphrodite", // bribe
	ChaosOfDionysus: "SoA - Chaos of Dionysus", // reverse
	FloodOfPoseidon: "SoA - Flood of Poseidon", // hex
	HuntOfArtemis: "SoA - Hunt of Artemis", // mine
	KnowledgeOfApollo: "SoA - Knowledge of Apollo", // wire
	WKSharmonizer: "SoA - phyzical WKS harmonizer"
}


// List of faction names pulled straight from the source code and converted to an object.
const factionNames = {
	Illuminati: "Illuminati",
	Daedalus: "Daedalus",
	TheCovenant: "The Covenant",
	ECorp: "ECorp",
	MegaCorp: "MegaCorp",
	BachmanAssociates: "Bachman & Associates",
	BladeIndustries: "Blade Industries",
	NWO: "NWO",
	ClarkeIncorporated: "Clarke Incorporated",
	OmniTekIncorporated: "OmniTek Incorporated",
	FourSigma: "Four Sigma",
	KuaiGongInternational: "KuaiGong International",
	FulcrumSecretTechnologies: "Fulcrum Secret Technologies",
	BitRunners: "BitRunners",
	TheBlackHand: "The Black Hand",
	NiteSec: "NiteSec",
	Aevum: "Aevum",
	Chongqing: "Chongqing",
	Ishima: "Ishima",
	NewTokyo: "New Tokyo",
	Sector12: "Sector-12",
	Volhaven: "Volhaven",
	SpeakersForTheDead: "Speakers for the Dead",
	TheDarkArmy: "The Dark Army",
	TheSyndicate: "The Syndicate",
	Silhouette: "Silhouette",
	Tetrads: "Tetrads",
	SlumSnakes: "Slum Snakes",
	Netburners: "Netburners",
	TianDiHui: "Tian Di Hui",
	CyberSec: "CyberSec",
	Bladeburners: "Bladeburners",
	ChurchOfTheMachineGod: "Church of the Machine God",
	ShadowsOfAnarchy: "Shadows of Anarchy"
}


// Library containing all general augmentations in the game.
export const generalAugLibrary = [
	{
		name: augNames.HemoRecirculator,
		moneyCost: 4.5e7,
		repCost: 1e4,
		info: "A heart implant that greatly increases the body's ability to effectively use and pump blood.",
		strength_mult: 1.08,
		defense_mult: 1.08,
		agility_mult: 1.08,
		dexterity_mult: 1.08,
		factions: [factionNames.Tetrads, factionNames.TheDarkArmy, factionNames.TheSyndicate],
	},
	{
		name: augNames.Targeting1,
		moneyCost: 1.5e7,
		repCost: 5e3,
		info:
			"A cranial implant that is embedded within the inner ear structures and optic nerves. It regulates " +
			"and enhances balance and hand-eye coordination.",
		dexterity_mult: 1.1,
		factions: [
			factionNames.SlumSnakes,
			factionNames.TheDarkArmy,
			factionNames.TheSyndicate,
			factionNames.Sector12,
			factionNames.Ishima,
			factionNames.OmniTekIncorporated,
			factionNames.KuaiGongInternational,
			factionNames.BladeIndustries,
		],
	},
	{
		name: augNames.Targeting2,
		moneyCost: 4.25e7,
		repCost: 8.75e3,
		info:
			"This upgraded version of the 'Augmented Targeting' implant is capable of augmenting " +
			"reality by digitally displaying weaknesses and vital signs of threats.",
		prereqs: [augNames.Targeting1],
		dexterity_mult: 1.2,
		factions: [
			factionNames.TheDarkArmy,
			factionNames.TheSyndicate,
			factionNames.Sector12,
			factionNames.OmniTekIncorporated,
			factionNames.KuaiGongInternational,
			factionNames.BladeIndustries,
		],
	},
	{
		name: augNames.Targeting3,
		moneyCost: 1.15e8,
		repCost: 2.75e4,
		info: "The latest version of the 'Augmented Targeting' implant adds the ability to lock-on and track threats.",
		prereqs: [augNames.Targeting2, augNames.Targeting1],
		dexterity_mult: 1.3,
		factions: [
			factionNames.TheDarkArmy,
			factionNames.TheSyndicate,
			factionNames.OmniTekIncorporated,
			factionNames.KuaiGongInternational,
			factionNames.BladeIndustries,
			factionNames.TheCovenant,
		],
	},
	{
		name: augNames.SyntheticHeart,
		moneyCost: 2.875e9,
		repCost: 7.5e5,
		info:
			"This advanced artificial heart, created from plasteel and graphene, is capable of pumping blood " +
			"more efficiently than an organic heart.",
		agility_mult: 1.5,
		strength_mult: 1.5,
		factions: [
			factionNames.KuaiGongInternational,
			factionNames.FulcrumSecretTechnologies,
			factionNames.SpeakersForTheDead,
			factionNames.NWO,
			factionNames.TheCovenant,
			factionNames.Daedalus,
			factionNames.Illuminati,
		],
	},
	{
		name: augNames.SynfibrilMuscle,
		repCost: 4.375e5,
		moneyCost: 1.125e9,
		info:
			"The myofibrils in human muscles are injected with special chemicals that react with the proteins inside " +
			"the myofibrils, altering their underlying structure. The end result is muscles that are stronger and more elastic. " +
			"Scientists have named these artificially enhanced units 'synfibrils'.",
		strength_mult: 1.3,
		defense_mult: 1.3,
		factions: [
			factionNames.KuaiGongInternational,
			factionNames.FulcrumSecretTechnologies,
			factionNames.SpeakersForTheDead,
			factionNames.NWO,
			factionNames.TheCovenant,
			factionNames.Daedalus,
			factionNames.Illuminati,
			factionNames.BladeIndustries,
		],
	},
	{
		name: augNames.CombatRib1,
		repCost: 7.5e3,
		moneyCost: 2.375e7,
		info:
			"The rib cage is augmented to continuously release boosters into the bloodstream " +
			"which increase the oxygen-carrying capacity of blood.",
		strength_mult: 1.1,
		defense_mult: 1.1,
		factions: [
			factionNames.SlumSnakes,
			factionNames.TheDarkArmy,
			factionNames.TheSyndicate,
			factionNames.Volhaven,
			factionNames.Ishima,
			factionNames.OmniTekIncorporated,
			factionNames.KuaiGongInternational,
			factionNames.BladeIndustries,
		],
	},
	{
		name: augNames.CombatRib2,
		repCost: 1.875e4,
		moneyCost: 6.5e7,
		info:
			"An upgraded version of the 'Combat Rib' augmentation that adds potent stimulants which " +
			"improve focus and endurance while decreasing reaction time and fatigue.",
		prereqs: [augNames.CombatRib1],
		strength_mult: 1.14,
		defense_mult: 1.14,
		factions: [
			factionNames.TheDarkArmy,
			factionNames.TheSyndicate,
			factionNames.Volhaven,
			factionNames.OmniTekIncorporated,
			factionNames.KuaiGongInternational,
			factionNames.BladeIndustries,
		],
	},
	{
		name: augNames.CombatRib3,
		repCost: 3.5e4,
		moneyCost: 1.2e8,
		info:
			"The latest version of the 'Combat Rib' augmentation releases advanced anabolic steroids that " +
			"improve muscle mass and physical performance while being safe and free of side effects.",
		prereqs: [augNames.CombatRib2, augNames.CombatRib1],
		strength_mult: 1.18,
		defense_mult: 1.18,
		factions: [
			factionNames.TheDarkArmy,
			factionNames.TheSyndicate,
			factionNames.OmniTekIncorporated,
			factionNames.KuaiGongInternational,
			factionNames.BladeIndustries,
			factionNames.TheCovenant,
		],
	},
	{
		name: augNames.NanofiberWeave,
		repCost: 3.75e4,
		moneyCost: 1.25e8,
		info:
			"Synthetic nanofibers are woven into the skin's extracellular matrix using electrospinning, " +
			"which improves its regenerative and extracellular homeostasis abilities.",
		strength_mult: 1.2,
		defense_mult: 1.2,
		factions: [
			factionNames.TheDarkArmy,
			factionNames.TheSyndicate,
			factionNames.OmniTekIncorporated,
			factionNames.BladeIndustries,
			factionNames.TianDiHui,
			factionNames.SpeakersForTheDead,
			factionNames.FulcrumSecretTechnologies,
		],
	},
	{
		name: augNames.SubdermalArmor,
		repCost: 8.75e5,
		moneyCost: 3.25e9,
		info:
			"The NEMEAN Subdermal Weave is a thin, light-weight, graphene plating that houses a dilatant fluid. " +
			"The material is implanted underneath the skin, and is the most advanced form of defensive enhancement " +
			"that has ever been created. The dilatant fluid, despite being thin and light, is extremely effective " +
			"at stopping piercing blows and reducing blunt trauma. The properties of graphene allow the plating to " +
			"mitigate damage from any fire or electrical traumas.",
		defense_mult: 2.2,
		factions: [
			factionNames.TheSyndicate,
			factionNames.FulcrumSecretTechnologies,
			factionNames.Illuminati,
			factionNames.Daedalus,
			factionNames.TheCovenant,
		],
	},
	{
		name: augNames.WiredReflexes,
		repCost: 1.25e3,
		moneyCost: 2.5e6,
		info:
			"Synthetic nerve-enhancements are injected into all major parts of the somatic nervous system, " +
			"supercharging the spread of neural signals and increasing reflex speed.",
		agility_mult: 1.05,
		dexterity_mult: 1.05,
		factions: [
			factionNames.TianDiHui,
			factionNames.SlumSnakes,
			factionNames.Sector12,
			factionNames.Volhaven,
			factionNames.Aevum,
			factionNames.Ishima,
			factionNames.TheSyndicate,
			factionNames.TheDarkArmy,
			factionNames.SpeakersForTheDead,
		],
	},
	{
		name: augNames.GrapheneBoneLacings,
		repCost: 1.125e6,
		moneyCost: 4.25e9,
		info: "Graphene is grafted and fused into the skeletal structure, enhancing bone density and tensile strength.",
		strength_mult: 1.7,
		defense_mult: 1.7,
		factions: [factionNames.FulcrumSecretTechnologies, factionNames.TheCovenant],
	},
	{
		name: augNames.BionicSpine,
		repCost: 4.5e4,
		moneyCost: 1.25e8,
		info:
			"The spine is reconstructed using plasteel and carbon fibers. " +
			"It is now capable of stimulating and regulating neural signals " +
			"passing through the spinal cord, improving senses and reaction speed. " +
			"The 'Bionic Spine' also interfaces with all other 'Bionic' implants.",
		strength_mult: 1.15,
		defense_mult: 1.15,
		agility_mult: 1.15,
		dexterity_mult: 1.15,
		factions: [
			factionNames.SpeakersForTheDead,
			factionNames.TheSyndicate,
			factionNames.KuaiGongInternational,
			factionNames.OmniTekIncorporated,
			factionNames.BladeIndustries,
		],
	},
	{
		name: augNames.GrapheneBionicSpine,
		repCost: 1.625e6,
		moneyCost: 6e9,
		info:
			"An upgrade to the 'Bionic Spine' augmentation. The spine is fused with graphene " +
			"which enhances durability and supercharges all body functions.",
		prereqs: [augNames.BionicSpine],
		strength_mult: 1.6,
		defense_mult: 1.6,
		agility_mult: 1.6,
		dexterity_mult: 1.6,
		factions: [factionNames.FulcrumSecretTechnologies, factionNames.ECorp],
	},
	{
		name: augNames.BionicLegs,
		repCost: 1.5e5,
		moneyCost: 3.75e8,
		info: "Cybernetic legs, created from plasteel and carbon fibers, enhance running speed.",
		agility_mult: 1.6,
		factions: [
			factionNames.SpeakersForTheDead,
			factionNames.TheSyndicate,
			factionNames.KuaiGongInternational,
			factionNames.OmniTekIncorporated,
			factionNames.BladeIndustries,
		],
	},
	{
		name: augNames.GrapheneBionicLegs,
		repCost: 7.5e5,
		moneyCost: 4.5e9,
		info:
			"An upgrade to the 'Bionic Legs' augmentation. The legs are fused " +
			"with graphene, greatly enhancing jumping ability.",
		prereqs: [augNames.BionicLegs],
		agility_mult: 2.5,
		factions: [factionNames.MegaCorp, factionNames.ECorp, factionNames.FulcrumSecretTechnologies],
	},
	{
		name: augNames.SpeechProcessor,
		repCost: 7.5e3,
		moneyCost: 5e7,
		info:
			"A cochlear implant with an embedded computer that analyzes incoming speech. " +
			"The embedded computer processes characteristics of incoming speech, such as tone " +
			"and inflection, to pick up on subtle cues and aid in social interactions.",
		charisma_mult: 1.2,
		factions: [
			factionNames.TianDiHui,
			factionNames.Chongqing,
			factionNames.Sector12,
			factionNames.NewTokyo,
			factionNames.Aevum,
			factionNames.Ishima,
			factionNames.Volhaven,
			factionNames.Silhouette,
		],
	},
	{
		name: augNames.TITN41Injection,
		repCost: 2.5e4,
		moneyCost: 1.9e8,
		info:
			"TITN is a series of viruses that targets and alters the sequences of human DNA in genes that " +
			"control personality. The TITN-41 strain alters these genes so that the subject becomes more " +
			"outgoing and sociable.",
		charisma_mult: 1.15,
		charisma_exp_mult: 1.15,
		factions: [factionNames.Silhouette],
	},
	{
		name: augNames.EnhancedSocialInteractionImplant,
		repCost: 3.75e5,
		moneyCost: 1.375e9,
		info:
			"A cranial implant that greatly assists in the user's ability to analyze social situations " +
			"and interactions. The system uses a wide variety of factors such as facial expression, body " +
			"language, voice tone, and inflection to determine the best course of action during social " +
			"situations. The implant also uses deep learning software to continuously learn new behavior " +
			"patterns and how to best respond.",
		charisma_mult: 1.6,
		charisma_exp_mult: 1.6,
		factions: [
			factionNames.BachmanAssociates,
			factionNames.NWO,
			factionNames.ClarkeIncorporated,
			factionNames.OmniTekIncorporated,
			factionNames.FourSigma,
		],
	},
	{
		name: augNames.BitWire,
		repCost: 3.75e3,
		moneyCost: 1e7,
		info:
			"A small brain implant embedded in the cerebrum. This regulates and improves the brain's computing " +
			"capabilities.",
		hacking_mult: 1.05,
		factions: [factionNames.CyberSec, factionNames.NiteSec],
	},
	{
		name: augNames.ArtificialBioNeuralNetwork,
		repCost: 2.75e5,
		moneyCost: 3e9,
		info:
			"A network consisting of millions of nanoprocessors is embedded into the brain. " +
			"The network is meant to mimic the way a biological brain solves a problem, with each " +
			"nanoprocessor acting similar to the way a neuron would in a neural network. However, these " +
			"nanoprocessors are programmed to perform computations much faster than organic neurons, " +
			"allowing the user to solve much more complex problems at a much faster rate.",
		hacking_speed_mult: 1.03,
		hacking_money_mult: 1.15,
		hacking_mult: 1.12,
		factions: [factionNames.BitRunners, factionNames.FulcrumSecretTechnologies],
	},
	{
		name: augNames.ArtificialSynapticPotentiation,
		repCost: 6.25e3,
		moneyCost: 8e7,
		info:
			"The body is injected with a chemical that artificially induces synaptic potentiation, " +
			"otherwise known as the strengthening of synapses. This results in enhanced cognitive abilities.",
		hacking_speed_mult: 1.02,
		hacking_chance_mult: 1.05,
		hacking_exp_mult: 1.05,
		factions: [factionNames.TheBlackHand, factionNames.NiteSec],
	},
	{
		name: augNames.EnhancedMyelinSheathing,
		repCost: 1e5,
		moneyCost: 1.375e9,
		info:
			"Electrical signals are used to induce a new, artificial form of myelinogenesis in the human body. " +
			"This process results in the proliferation of new, synthetic myelin sheaths in the nervous " +
			"system. These myelin sheaths can propogate neuro-signals much faster than their organic " +
			"counterparts, leading to greater processing speeds and better brain function.",
		hacking_speed_mult: 1.03,
		hacking_exp_mult: 1.1,
		hacking_mult: 1.08,
		factions: [factionNames.FulcrumSecretTechnologies, factionNames.BitRunners, factionNames.TheBlackHand],
	},
	{
		name: augNames.SynapticEnhancement,
		repCost: 2e3,
		moneyCost: 7.5e6,
		info:
			"A small cranial implant that continuously uses weak electrical signals to stimulate the brain and " +
			"induce stronger synaptic activity. This improves the user's cognitive abilities.",
		hacking_speed_mult: 1.03,
		factions: [factionNames.CyberSec, factionNames.Aevum],
	},
	{
		name: augNames.NeuralRetentionEnhancement,
		repCost: 2e4,
		moneyCost: 2.5e8,
		info:
			"Chemical injections are used to permanently alter and strengthen the brain's neuronal " +
			"circuits, strengthening the ability to retain information.",
		hacking_exp_mult: 1.25,
		factions: [factionNames.NiteSec],
	},
	{
		name: augNames.DataJack,
		repCost: 1.125e5,
		moneyCost: 4.5e8,
		info:
			"A brain implant that provides an interface for direct, wireless communication between a computer's main " +
			"memory and the mind. This implant allows the user to not only access a computer's memory, but also alter " +
			"and delete it.",
		hacking_money_mult: 1.25,
		factions: [
			factionNames.BitRunners,
			factionNames.TheBlackHand,
			factionNames.NiteSec,
			factionNames.Chongqing,
			factionNames.NewTokyo,
		],
	},
	{
		name: augNames.ENM,
		repCost: 1.5e4,
		moneyCost: 2.5e8,
		info:
			"A thin device embedded inside the arm containing a wireless module capable of connecting " +
			"to nearby networks. Once connected, the Netburner Module is capable of capturing and " +
			"processing all of the traffic on that network. By itself, the Embedded Netburner Module does " +
			"not do much, but a variety of very powerful upgrades can be installed that allow you to fully " +
			"control the traffic on a network.",
		hacking_mult: 1.08,
		factions: [
			factionNames.BitRunners,
			factionNames.TheBlackHand,
			factionNames.NiteSec,
			factionNames.ECorp,
			factionNames.MegaCorp,
			factionNames.FulcrumSecretTechnologies,
			factionNames.NWO,
			factionNames.BladeIndustries,
		],
	},
	{
		name: augNames.ENMCore,
		repCost: 175e3,
		moneyCost: 2.5e9,
		info:
			"The Core library is an implant that upgrades the firmware of the Embedded Netburner Module. " +
			"This upgrade allows the Embedded Netburner Module to generate its own data on a network.",
		prereqs: [augNames.ENM],
		hacking_speed_mult: 1.03,
		hacking_money_mult: 1.1,
		hacking_chance_mult: 1.03,
		hacking_exp_mult: 1.07,
		hacking_mult: 1.07,
		factions: [
			factionNames.BitRunners,
			factionNames.TheBlackHand,
			factionNames.ECorp,
			factionNames.MegaCorp,
			factionNames.FulcrumSecretTechnologies,
			factionNames.NWO,
			factionNames.BladeIndustries,
		],
	},
	{
		name: augNames.ENMCoreV2,
		repCost: 1e6,
		moneyCost: 4.5e9,
		info:
			"The Core V2 library is an implant that upgrades the firmware of the Embedded Netburner Module. " +
			"This upgraded firmware allows the Embedded Netburner Module to control information on " +
			"a network by re-routing traffic, spoofing IP addresses, and altering the data inside network " +
			"packets.",
		prereqs: [augNames.ENMCore, augNames.ENM],
		hacking_speed_mult: 1.05,
		hacking_money_mult: 1.3,
		hacking_chance_mult: 1.05,
		hacking_exp_mult: 1.15,
		hacking_mult: 1.08,
		factions: [
			factionNames.BitRunners,
			factionNames.ECorp,
			factionNames.MegaCorp,
			factionNames.FulcrumSecretTechnologies,
			factionNames.NWO,
			factionNames.BladeIndustries,
			factionNames.OmniTekIncorporated,
			factionNames.KuaiGongInternational,
		],
	},
	{
		name: augNames.ENMCoreV3,
		repCost: 1.75e6,
		moneyCost: 7.5e9,
		info:
			"The Core V3 library is an implant that upgrades the firmware of the Embedded Netburner Module. " +
			"This upgraded firmware allows the Embedded Netburner Module to seamlessly inject code into " +
			"any device on a network.",
		prereqs: [augNames.ENMCoreV2, augNames.ENMCore, augNames.ENM],
		hacking_speed_mult: 1.05,
		hacking_money_mult: 1.4,
		hacking_chance_mult: 1.1,
		hacking_exp_mult: 1.25,
		hacking_mult: 1.1,
		factions: [
			factionNames.ECorp,
			factionNames.MegaCorp,
			factionNames.FulcrumSecretTechnologies,
			factionNames.NWO,
			factionNames.Daedalus,
			factionNames.TheCovenant,
			factionNames.Illuminati,
		],
	},
	{
		name: augNames.ENMAnalyzeEngine,
		repCost: 6.25e5,
		moneyCost: 6e9,
		info:
			"Installs the Analyze Engine for the Embedded Netburner Module, which is a CPU cluster " +
			"that vastly outperforms the Netburner Module's native single-core processor.",
		prereqs: [augNames.ENM],
		hacking_speed_mult: 1.1,
		factions: [
			factionNames.ECorp,
			factionNames.MegaCorp,
			factionNames.FulcrumSecretTechnologies,
			factionNames.NWO,
			factionNames.Daedalus,
			factionNames.TheCovenant,
			factionNames.Illuminati,
		],
	},
	{
		name: augNames.ENMDMA,
		repCost: 1e6,
		moneyCost: 7e9,
		info:
			"This implant installs a Direct Memory Access (DMA) controller into the " +
			"Embedded Netburner Module. This allows the Module to send and receive data " +
			"directly to and from the main memory of devices on a network.",
		prereqs: [augNames.ENM],
		hacking_money_mult: 1.4,
		hacking_chance_mult: 1.2,
		factions: [
			factionNames.ECorp,
			factionNames.MegaCorp,
			factionNames.FulcrumSecretTechnologies,
			factionNames.NWO,
			factionNames.Daedalus,
			factionNames.TheCovenant,
			factionNames.Illuminati,
		],
	},
	{
		name: augNames.Neuralstimulator,
		repCost: 5e4,
		moneyCost: 3e9,
		info:
			"A cranial implant that intelligently stimulates certain areas of the brain " +
			"in order to improve cognitive functions.",
		hacking_speed_mult: 1.02,
		hacking_chance_mult: 1.1,
		hacking_exp_mult: 1.12,
		factions: [
			factionNames.TheBlackHand,
			factionNames.Chongqing,
			factionNames.Sector12,
			factionNames.NewTokyo,
			factionNames.Aevum,
			factionNames.Ishima,
			factionNames.Volhaven,
			factionNames.BachmanAssociates,
			factionNames.ClarkeIncorporated,
			factionNames.FourSigma,
		],
	},
	{
		name: augNames.NeuralAccelerator,
		repCost: 2e5,
		moneyCost: 1.75e9,
		info:
			"A microprocessor that accelerates the processing " +
			"speed of biological neural networks. This is a cranial implant that is embedded inside the brain.",
		hacking_mult: 1.1,
		hacking_exp_mult: 1.15,
		hacking_money_mult: 1.2,
		factions: [factionNames.BitRunners],
	},
	{
		name: augNames.CranialSignalProcessorsG1,
		repCost: 1e4,
		moneyCost: 7e7,
		info:
			"The first generation of Cranial Signal Processors. Cranial Signal Processors " +
			"are a set of specialized microprocessors that are attached to " +
			"neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations " +
			"so that the brain doesn't have to.",
		hacking_speed_mult: 1.01,
		hacking_mult: 1.05,
		factions: [factionNames.CyberSec, factionNames.NiteSec],
	},
	{
		name: augNames.CranialSignalProcessorsG2,
		repCost: 1.875e4,
		moneyCost: 1.25e8,
		info:
			"The second generation of Cranial Signal Processors. Cranial Signal Processors " +
			"are a set of specialized microprocessors that are attached to " +
			"neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations " +
			"so that the brain doesn't have to.",
		prereqs: [augNames.CranialSignalProcessorsG1],
		hacking_speed_mult: 1.02,
		hacking_chance_mult: 1.05,
		hacking_mult: 1.07,
		factions: [factionNames.CyberSec, factionNames.NiteSec],
	},
	{
		name: augNames.CranialSignalProcessorsG3,
		repCost: 5e4,
		moneyCost: 5.5e8,
		info:
			"The third generation of Cranial Signal Processors. Cranial Signal Processors " +
			"are a set of specialized microprocessors that are attached to " +
			"neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations " +
			"so that the brain doesn't have to.",
		prereqs: [augNames.CranialSignalProcessorsG2, augNames.CranialSignalProcessorsG1],
		hacking_speed_mult: 1.02,
		hacking_money_mult: 1.15,
		hacking_mult: 1.09,
		factions: [factionNames.NiteSec, factionNames.TheBlackHand, factionNames.BitRunners],
	},
	{
		name: augNames.CranialSignalProcessorsG4,
		repCost: 1.25e5,
		moneyCost: 1.1e9,
		info:
			"The fourth generation of Cranial Signal Processors. Cranial Signal Processors " +
			"are a set of specialized microprocessors that are attached to " +
			"neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations " +
			"so that the brain doesn't have to.",
		prereqs: [
			augNames.CranialSignalProcessorsG3,
			augNames.CranialSignalProcessorsG2,
			augNames.CranialSignalProcessorsG1,
		],
		hacking_speed_mult: 1.02,
		hacking_money_mult: 1.2,
		hacking_grow_mult: 1.25,
		factions: [factionNames.TheBlackHand, factionNames.BitRunners],
	},
	{
		name: augNames.CranialSignalProcessorsG5,
		repCost: 2.5e5,
		moneyCost: 2.25e9,
		info:
			"The fifth generation of Cranial Signal Processors. Cranial Signal Processors " +
			"are a set of specialized microprocessors that are attached to " +
			"neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations " +
			"so that the brain doesn't have to.",
		prereqs: [
			augNames.CranialSignalProcessorsG4,
			augNames.CranialSignalProcessorsG3,
			augNames.CranialSignalProcessorsG2,
			augNames.CranialSignalProcessorsG1,
		],
		hacking_mult: 1.3,
		hacking_money_mult: 1.25,
		hacking_grow_mult: 1.75,
		factions: [factionNames.BitRunners],
	},
	{
		name: augNames.NeuronalDensification,
		repCost: 1.875e5,
		moneyCost: 1.375e9,
		info:
			"The brain is surgically re-engineered to have increased neuronal density " +
			"by decreasing the neuron gap junction. Then, the body is genetically modified " +
			"to enhance the production and capabilities of its neural stem cells.",
		hacking_mult: 1.15,
		hacking_exp_mult: 1.1,
		hacking_speed_mult: 1.03,
		factions: [factionNames.ClarkeIncorporated],
	},
	{
		name: augNames.NuoptimalInjectorImplant,
		repCost: 5e3,
		moneyCost: 2e7,
		info:
			"This torso implant automatically injects nootropic supplements into " +
			"the bloodstream to improve memory, increase focus, and provide other " +
			"cognitive enhancements.",
		company_rep_mult: 1.2,
		factions: [
			factionNames.TianDiHui,
			factionNames.Volhaven,
			factionNames.NewTokyo,
			factionNames.Chongqing,
			factionNames.ClarkeIncorporated,
			factionNames.FourSigma,
			factionNames.BachmanAssociates,
		],
	},
	{
		name: augNames.SpeechEnhancement,
		repCost: 2.5e3,
		moneyCost: 1.25e7,
		info:
			"An advanced neural implant that improves your speaking abilities, making " +
			"you more convincing and likable in conversations and overall improving your " +
			"social interactions.",
		company_rep_mult: 1.1,
		charisma_mult: 1.1,
		factions: [
			factionNames.TianDiHui,
			factionNames.SpeakersForTheDead,
			factionNames.FourSigma,
			factionNames.KuaiGongInternational,
			factionNames.ClarkeIncorporated,
			factionNames.BachmanAssociates,
		],
	},
	{
		name: augNames.FocusWire,
		repCost: 7.5e4,
		moneyCost: 9e8,
		info: "A cranial implant that stops procrastination by blocking specific neural pathways in the brain.",
		hacking_exp_mult: 1.05,
		strength_exp_mult: 1.05,
		defense_exp_mult: 1.05,
		dexterity_exp_mult: 1.05,
		agility_exp_mult: 1.05,
		charisma_exp_mult: 1.05,
		company_rep_mult: 1.1,
		work_money_mult: 1.2,
		factions: [
			factionNames.BachmanAssociates,
			factionNames.ClarkeIncorporated,
			factionNames.FourSigma,
			factionNames.KuaiGongInternational,
		],
	},
	{
		name: augNames.PCDNI,
		repCost: 3.75e5,
		moneyCost: 3.75e9,
		info:
			"Installs a Direct-Neural Interface jack into your arm that is compatible with most " +
			"computers. Connecting to a computer through this jack allows you to interface with " +
			"it using the brain's electrochemical signals.",
		company_rep_mult: 1.3,
		hacking_mult: 1.08,
		factions: [
			factionNames.FourSigma,
			factionNames.OmniTekIncorporated,
			factionNames.ECorp,
			factionNames.BladeIndustries,
		],
	},
	{
		name: augNames.PCDNIOptimizer,
		repCost: 5e5,
		moneyCost: 4.5e9,
		info:
			"This is a submodule upgrade to the PC Direct-Neural Interface augmentation. It " +
			"improves the performance of the interface and gives the user more control options " +
			"to a connected computer.",
		prereqs: [augNames.PCDNI],
		company_rep_mult: 1.75,
		hacking_mult: 1.1,
		factions: [factionNames.FulcrumSecretTechnologies, factionNames.ECorp, factionNames.BladeIndustries],
	},
	{
		name: augNames.PCDNINeuralNetwork,
		repCost: 1.5e6,
		moneyCost: 7.5e9,
		info:
			"This is an additional installation that upgrades the functionality of the " +
			"PC Direct-Neural Interface augmentation. When connected to a computer, " +
			"the Neural Network upgrade allows the user to use their own brain's " +
			"processing power to aid the computer in computational tasks.",
		prereqs: [augNames.PCDNI],
		company_rep_mult: 2,
		hacking_mult: 1.1,
		hacking_speed_mult: 1.05,
		factions: [factionNames.FulcrumSecretTechnologies],
	},
	{
		name: augNames.ADRPheromone1,
		repCost: 3.75e3,
		moneyCost: 1.75e7,
		info:
			"The body is genetically re-engineered so that it produces the ADR-V1 pheromone, " +
			"an artificial pheromone discovered by scientists. The ADR-V1 pheromone, when excreted, " +
			"triggers feelings of admiration and approval in other people.",
		company_rep_mult: 1.1,
		faction_rep_mult: 1.1,
		factions: [
			factionNames.TianDiHui,
			factionNames.TheSyndicate,
			factionNames.NWO,
			factionNames.MegaCorp,
			factionNames.FourSigma,
		],
	},
	{
		name: augNames.ADRPheromone2,
		repCost: 6.25e4,
		moneyCost: 5.5e8,
		info:
			"The body is genetically re-engineered so that it produces the ADR-V2 pheromone, " +
			"which is similar to but more potent than ADR-V1. This pheromone, when excreted, " +
			"triggers feelings of admiration, approval, and respect in others.",
		company_rep_mult: 1.2,
		faction_rep_mult: 1.2,
		factions: [
			factionNames.Silhouette,
			factionNames.FourSigma,
			factionNames.BachmanAssociates,
			factionNames.ClarkeIncorporated,
		],
	},
	{
		name: augNames.ShadowsSimulacrum,
		repCost: 3.75e4,
		moneyCost: 4e8,
		info:
			"A crude but functional matter phase-shifter module that is embedded " +
			"in the brainstem and cerebellum. This augmentation was developed by " +
			"criminal organizations and allows the user to project and control holographic " +
			"simulacrums within a large radius. These simulacrums are commonly used for " +
			"espionage and surveillance work.",
		company_rep_mult: 1.15,
		faction_rep_mult: 1.15,
		factions: [factionNames.TheSyndicate, factionNames.TheDarkArmy, factionNames.SpeakersForTheDead],
	},
	{
		name: augNames.HacknetNodeCPUUpload,
		repCost: 3.75e3,
		moneyCost: 1.1e7,
		info:
			"Uploads the architecture and design details of a Hacknet Node's CPU into " +
			"the brain. This allows the user to engineer custom hardware and software  " +
			"for the Hacknet Node that provides better performance.",
		hacknet_node_money_mult: 1.15,
		hacknet_node_purchase_cost_mult: 0.85,
		factions: [factionNames.Netburners],
	},
	{
		name: augNames.HacknetNodeCacheUpload,
		repCost: 2.5e3,
		moneyCost: 5.5e6,
		info:
			"Uploads the architecture and design details of a Hacknet Node's main-memory cache " +
			"into the brain. This allows the user to engineer custom cache hardware for the  " +
			"Hacknet Node that offers better performance.",
		hacknet_node_money_mult: 1.1,
		hacknet_node_level_cost_mult: 0.85,
		factions: [factionNames.Netburners],
	},
	{
		name: augNames.HacknetNodeNICUpload,
		repCost: 1.875e3,
		moneyCost: 4.5e6,
		info:
			"Uploads the architecture and design details of a Hacknet Node's Network Interface Card (NIC) " +
			"into the brain. This allows the user to engineer a custom NIC for the Hacknet Node that " +
			"offers better performance.",
		hacknet_node_money_mult: 1.1,
		hacknet_node_purchase_cost_mult: 0.9,
		factions: [factionNames.Netburners],
	},
	{
		name: augNames.HacknetNodeKernelDNI,
		repCost: 7.5e3,
		moneyCost: 4e7,
		info:
			"Installs a Direct-Neural Interface jack into the arm that is capable of connecting to a " +
			"Hacknet Node. This lets the user access and manipulate the Node's kernel using " +
			"electrochemical signals.",
		hacknet_node_money_mult: 1.25,
		factions: [factionNames.Netburners],
	},
	{
		name: augNames.HacknetNodeCoreDNI,
		repCost: 1.25e4,
		moneyCost: 6e7,
		info:
			"Installs a Direct-Neural Interface jack into the arm that is capable of connecting " +
			"to a Hacknet Node. This lets the user access and manipulate the Node's processing logic using " +
			"electrochemical signals.",
		hacknet_node_money_mult: 1.45,
		factions: [factionNames.Netburners],
	},
	{
		name: augNames.Neurotrainer1,
		repCost: 1e3,
		moneyCost: 4e6,
		info:
			"A decentralized cranial implant that improves the brain's ability to learn. It is " +
			"installed by releasing millions of nanobots into the human brain, each of which " +
			"attaches to a different neural pathway to enhance the brain's ability to retain " +
			"and retrieve information.",
		hacking_exp_mult: 1.1,
		strength_exp_mult: 1.1,
		defense_exp_mult: 1.1,
		dexterity_exp_mult: 1.1,
		agility_exp_mult: 1.1,
		charisma_exp_mult: 1.1,
		factions: [factionNames.CyberSec, factionNames.Aevum],
	},
	{
		name: augNames.Neurotrainer2,
		repCost: 1e4,
		moneyCost: 4.5e7,
		info:
			"A decentralized cranial implant that improves the brain's ability to learn. This " +
			"is a more powerful version of the Neurotrainer I augmentation, but it does not " +
			"require Neurotrainer I to be installed as a prerequisite.",
		hacking_exp_mult: 1.15,
		strength_exp_mult: 1.15,
		defense_exp_mult: 1.15,
		dexterity_exp_mult: 1.15,
		agility_exp_mult: 1.15,
		charisma_exp_mult: 1.15,
		factions: [factionNames.BitRunners, factionNames.NiteSec],
	},
	{
		name: augNames.Neurotrainer3,
		repCost: 2.5e4,
		moneyCost: 1.3e8,
		info:
			"A decentralized cranial implant that improves the brain's ability to learn. This " +
			"is a more powerful version of the Neurotrainer I and Neurotrainer II augmentation, " +
			"but it does not require either of them to be installed as a prerequisite.",
		hacking_exp_mult: 1.2,
		strength_exp_mult: 1.2,
		defense_exp_mult: 1.2,
		dexterity_exp_mult: 1.2,
		agility_exp_mult: 1.2,
		charisma_exp_mult: 1.2,
		factions: [factionNames.NWO, factionNames.FourSigma],
	},
	{
		name: augNames.Hypersight,
		repCost: 1.5e5,
		moneyCost: 2.75e9,
		info:
			"A bionic eye implant that grants sight capabilities far beyond those of a natural human. " +
			"Embedded circuitry within the implant provides the ability to detect heat and movement " +
			"through solid objects such as walls, thus providing 'x-ray vision'-like capabilities.",
		dexterity_mult: 1.4,
		hacking_speed_mult: 1.03,
		hacking_money_mult: 1.1,
		factions: [factionNames.BladeIndustries, factionNames.KuaiGongInternational],
	},
	{
		name: augNames.LuminCloaking1,
		repCost: 1.5e3,
		moneyCost: 5e6,
		info:
			"A skin implant that reinforces the skin with highly-advanced synthetic cells. These " +
			"cells, when powered, have a negative refractive index. As a result, they bend light " +
			"around the skin, making the user much harder to see with the naked eye.",
		agility_mult: 1.05,
		crime_money_mult: 1.1,
		factions: [factionNames.SlumSnakes, factionNames.Tetrads],
	},
	{
		name: augNames.LuminCloaking2,
		repCost: 5e3,
		moneyCost: 3e7,
		info:
			"This is a more advanced version of the LuminCloaking-V1 augmentation. This skin implant " +
			"reinforces the skin with highly-advanced synthetic cells. These " +
			"cells, when powered, are capable of not only bending light but also of bending heat, " +
			"making the user more resilient as well as stealthy.",
		prereqs: [augNames.LuminCloaking1],
		agility_mult: 1.1,
		defense_mult: 1.1,
		crime_money_mult: 1.25,
		factions: [factionNames.SlumSnakes, factionNames.Tetrads],
	},
	{
		name: augNames.SmartSonar,
		repCost: 2.25e4,
		moneyCost: 7.5e7,
		info: "A cochlear implant that helps the player detect and locate enemies using sound propagation.",
		dexterity_mult: 1.1,
		dexterity_exp_mult: 1.15,
		crime_money_mult: 1.25,
		factions: [factionNames.SlumSnakes],
	},
	{
		name: augNames.PowerRecirculator,
		repCost: 2.5e4,
		moneyCost: 1.8e8,
		info:
			"The body's nerves are attached with polypyrrole nanocircuits that " +
			"are capable of capturing wasted energy, in the form of heat, " +
			"and converting it back into usable power.",
		hacking_mult: 1.05,
		strength_mult: 1.05,
		defense_mult: 1.05,
		dexterity_mult: 1.05,
		agility_mult: 1.05,
		charisma_mult: 1.05,
		hacking_exp_mult: 1.1,
		strength_exp_mult: 1.1,
		defense_exp_mult: 1.1,
		dexterity_exp_mult: 1.1,
		agility_exp_mult: 1.1,
		charisma_exp_mult: 1.1,
		factions: [factionNames.Tetrads, factionNames.TheDarkArmy, factionNames.TheSyndicate, factionNames.NWO],
	},
	{
		name: augNames.QLink,
		repCost: 1.875e6,
		moneyCost: 2.5e13,
		info:
			`A brain implant that wirelessly connects you to the ${factionNames.Illuminati}'s ` +
			"quantum supercomputer, allowing you to access and use its incredible " +
			"computing power.",
		hacking_mult: 1.75,
		hacking_speed_mult: 2,
		hacking_chance_mult: 2.5,
		hacking_money_mult: 4,
		factions: [factionNames.Illuminati],
	},
	{
		name: augNames.SPTN97,
		repCost: 1.25e6,
		moneyCost: 4.875e9,
		info:
			"The SPTN-97 gene is injected into the genome. The SPTN-97 gene is an " +
			"artificially-synthesized gene that was developed by DARPA to create " +
			"super-soldiers through genetic modification. The gene was outlawed in " +
			"2056.",
		strength_mult: 1.75,
		defense_mult: 1.75,
		dexterity_mult: 1.75,
		agility_mult: 1.75,
		hacking_mult: 1.15,
		factions: [factionNames.TheCovenant],
	},
	{
		name: augNames.HiveMind,
		repCost: 1.5e6,
		moneyCost: 5.5e9,
		info:
			`A brain implant developed by ${factionNames.ECorp}. They do not reveal what ` +
			"exactly the implant does, but they promise that it will greatly " +
			"enhance your abilities.",
		hacking_grow_mult: 3,
		stats: null,
		factions: [factionNames.ECorp],
	},
	{
		name: augNames.TheRedPill,
		repCost: 2.5e6,
		moneyCost: 0,
		info: "It's time to leave the cave.",
		stats: null,
		isSpecial: true,
		factions: [factionNames.Daedalus],
	},
	{
		name: augNames.CordiARCReactor,
		repCost: 1.125e6,
		moneyCost: 5e9,
		info:
			"The thoracic cavity is equipped with a small chamber designed " +
			"to hold and sustain hydrogen plasma. The plasma is used to generate " +
			"fusion power through nuclear fusion, providing limitless amounts of clean " +
			"energy for the body.",
		strength_mult: 1.35,
		defense_mult: 1.35,
		dexterity_mult: 1.35,
		agility_mult: 1.35,
		strength_exp_mult: 1.35,
		defense_exp_mult: 1.35,
		dexterity_exp_mult: 1.35,
		agility_exp_mult: 1.35,
		factions: [factionNames.MegaCorp],
	},
	{
		name: augNames.SmartJaw,
		repCost: 3.75e5,
		moneyCost: 2.75e9,
		info:
			"A bionic jaw that contains advanced hardware and software " +
			"capable of psychoanalyzing and profiling the personality of " +
			"others using optical imaging software.",
		charisma_mult: 1.5,
		charisma_exp_mult: 1.5,
		company_rep_mult: 1.25,
		faction_rep_mult: 1.25,
		factions: [factionNames.BachmanAssociates],
	},
	{
		name: augNames.Neotra,
		repCost: 5.625e5,
		moneyCost: 2.875e9,
		info:
			"A highly-advanced techno-organic drug that is injected into the skeletal " +
			"and integumentary system. The drug permanently modifies the DNA of the " +
			"body's skin and bone cells, granting them the ability to repair " +
			"and restructure themselves.",
		strength_mult: 1.55,
		defense_mult: 1.55,
		factions: [factionNames.BladeIndustries],
	},
	{
		name: augNames.Xanipher,
		repCost: 8.75e5,
		moneyCost: 4.25e9,
		info:
			"A concoction of advanced nanobots that is orally ingested into the " +
			"body. These nanobots induce physiological changes and significantly " +
			"improve the body's functioning in all aspects.",
		hacking_mult: 1.2,
		strength_mult: 1.2,
		defense_mult: 1.2,
		dexterity_mult: 1.2,
		agility_mult: 1.2,
		charisma_mult: 1.2,
		hacking_exp_mult: 1.15,
		strength_exp_mult: 1.15,
		defense_exp_mult: 1.15,
		dexterity_exp_mult: 1.15,
		agility_exp_mult: 1.15,
		charisma_exp_mult: 1.15,
		factions: [factionNames.NWO],
	},
	{
		name: augNames.HydroflameLeftArm,
		repCost: 1.25e6,
		moneyCost: 2.5e12,
		info:
			"The left arm of a legendary BitRunner who ascended beyond this world. " +
			"It projects a light blue energy shield that protects the exposed inner parts. " +
			"Even though it contains no weapons, the advanced tungsten titanium " +
			"alloy increases the user's strength to unbelievable levels. The augmentation " +
			"gets more powerful over time for seemingly no reason.",
		strength_mult: 2.7,
		factions: [factionNames.NWO],
	},
	{
		name: augNames.nextSENS,
		repCost: 4.375e5,
		moneyCost: 1.925e9,
		info:
			"The body is genetically re-engineered to maintain a state " +
			"of negligible senescence, preventing the body from " +
			"deteriorating with age.",
		hacking_mult: 1.2,
		strength_mult: 1.2,
		defense_mult: 1.2,
		dexterity_mult: 1.2,
		agility_mult: 1.2,
		charisma_mult: 1.2,
		factions: [factionNames.ClarkeIncorporated],
	},
	{
		name: augNames.OmniTekInfoLoad,
		repCost: 6.25e5,
		moneyCost: 2.875e9,
		info:
			"OmniTek's data and information repository is uploaded " +
			"into your brain, enhancing your programming and " +
			"hacking abilities.",
		hacking_mult: 1.2,
		hacking_exp_mult: 1.25,
		factions: [factionNames.OmniTekIncorporated],
	},
	{
		name: augNames.PhotosyntheticCells,
		repCost: 5.625e5,
		moneyCost: 2.75e9,
		info:
			"Chloroplasts are added to epidermal stem cells and are applied " +
			"to the body using a skin graft. The result is photosynthetic " +
			"skin cells, allowing users to generate their own energy " +
			"and nutrition using solar power.",
		strength_mult: 1.4,
		defense_mult: 1.4,
		agility_mult: 1.4,
		factions: [factionNames.KuaiGongInternational],
	},
	{
		name: augNames.Neurolink,
		repCost: 8.75e5,
		moneyCost: 4.375e9,
		info:
			"A brain implant that provides a high-bandwidth, direct neural link between your " +
			`mind and the ${factionNames.BitRunners}' data servers, which reportedly contain ` +
			"the largest database of hacking tools and information in the world.",
		hacking_mult: 1.15,
		hacking_exp_mult: 1.2,
		hacking_chance_mult: 1.1,
		hacking_speed_mult: 1.05,
		programs: ["FTPCrack.exe", "RelaySMTP.exe"],
		factions: [factionNames.BitRunners],
	},
	{
		name: augNames.TheBlackHand,
		repCost: 1e5,
		moneyCost: 5.5e8,
		info:
			"A highly advanced bionic hand. This prosthetic not only " +
			"enhances strength and dexterity but it is also embedded " +
			"with hardware and firmware that lets the user connect to, access, and hack " +
			"devices and machines by just touching them.",
		strength_mult: 1.15,
		dexterity_mult: 1.15,
		hacking_mult: 1.1,
		hacking_speed_mult: 1.02,
		hacking_money_mult: 1.1,
		factions: [factionNames.TheBlackHand],
	},
	{
		name: augNames.CRTX42AA,
		repCost: 4.5e4,
		moneyCost: 2.25e8,
		info:
			"The CRTX42-AA gene is injected into the genome. " +
			"The CRTX42-AA is an artificially-synthesized gene that targets the visual and prefrontal " +
			"cortex and improves cognitive abilities.",
		hacking_mult: 1.08,
		hacking_exp_mult: 1.15,
		factions: [factionNames.NiteSec],
	},
	{
		name: augNames.Neuregen,
		repCost: 3.75e4,
		moneyCost: 3.75e8,
		info:
			"A drug that genetically modifies the neurons in the brain " +
			"resulting in neurons that never die, continuously " +
			"regenerate, and strengthen themselves.",
		hacking_exp_mult: 1.4,
		factions: [factionNames.Chongqing],
	},
	{
		name: augNames.CashRoot,
		repCost: 1.25e4,
		moneyCost: 1.25e8,
		info:
			"A collection of digital assets saved on a small chip. The chip is implanted into your wrist. A small jack in the " +
			"chip allows you to connect it to a computer and upload the assets.",
		startingMoney: 1e6,
		programs: ["BruteSSH.exe"],
		factions: [factionNames.Sector12],
	},
	{
		name: augNames.NutriGen,
		repCost: 6.25e3,
		moneyCost: 2.5e6,
		info:
			"A thermo-powered artificial nutrition generator. Endogenously " +
			"synthesizes glucose, amino acids, and vitamins and redistributes them " +
			"across the body. The device is powered by the body's naturally wasted " +
			"energy in the form of heat.",
		strength_exp_mult: 1.2,
		defense_exp_mult: 1.2,
		dexterity_exp_mult: 1.2,
		agility_exp_mult: 1.2,
		factions: [factionNames.NewTokyo],
	},
	{
		name: augNames.PCMatrix,
		repCost: 100e3,
		moneyCost: 2e9,
		info:
			"A 'Probability Computation Matrix' is installed in the frontal cortex. This implant " +
			"uses advanced mathematical algorithims to rapidly identify and compute statistical " +
			"outcomes of nearly every situation.",
		charisma_mult: 1.0777,
		charisma_exp_mult: 1.0777,
		work_money_mult: 1.777,
		faction_rep_mult: 1.0777,
		company_rep_mult: 1.0777,
		crime_success_mult: 1.0777,
		crime_money_mult: 1.0777,
		programs: ["DeepscanV1.exe", "AutoLink.exe"],
		factions: [factionNames.Aevum],
	},
	{
		name: augNames.INFRARet,
		repCost: 7.5e3,
		moneyCost: 3e7,
		info: "A tiny chip that sits behind the retinae. This implant lets the user visually detect infrared radiation.",
		crime_success_mult: 1.25,
		crime_money_mult: 1.1,
		dexterity_mult: 1.1,
		factions: [factionNames.Ishima],
	},
	{
		name: augNames.DermaForce,
		repCost: 1.5e4,
		moneyCost: 5e7,
		info:
			"Synthetic skin that is grafted onto the body. This skin consists of " +
			"millions of nanobots capable of projecting high-density muon beams, " +
			"creating an energy barrier around the user.",
		defense_mult: 1.4,
		factions: [factionNames.Volhaven],
	},
	{
		name: augNames.GrapheneBrachiBlades,
		repCost: 2.25e5,
		moneyCost: 2.5e9,
		info:
			"An upgrade to the BrachiBlades augmentation. It infuses " +
			"the retractable blades with an advanced graphene material " +
			"making them stronger and lighter.",
		prereqs: [augNames.BrachiBlades],
		strength_mult: 1.4,
		defense_mult: 1.4,
		crime_success_mult: 1.1,
		crime_money_mult: 1.3,
		factions: [factionNames.SpeakersForTheDead],
	},
	{
		name: augNames.GrapheneBionicArms,
		repCost: 5e5,
		moneyCost: 3.75e9,
		info:
			"An upgrade to the Bionic Arms augmentation. It infuses the " +
			"prosthetic arms with an advanced graphene material " +
			"to make them stronger and lighter.",
		prereqs: [augNames.BionicArms],
		strength_mult: 1.85,
		dexterity_mult: 1.85,
		factions: [factionNames.TheDarkArmy],
	},
	{
		name: augNames.BrachiBlades,
		repCost: 1.25e4,
		moneyCost: 9e7,
		info: "A set of retractable plasteel blades that are implanted in the arm, underneath the skin.",
		strength_mult: 1.15,
		defense_mult: 1.15,
		crime_success_mult: 1.1,
		crime_money_mult: 1.15,
		factions: [factionNames.TheSyndicate],
	},
	{
		name: augNames.BionicArms,
		repCost: 6.25e4,
		moneyCost: 2.75e8,
		info: "Cybernetic arms created from plasteel and carbon fibers that completely replace the user's organic arms.",
		strength_mult: 1.3,
		dexterity_mult: 1.3,
		factions: [factionNames.Tetrads],
	},
	{
		name: augNames.SNA,
		repCost: 6.25e3,
		moneyCost: 3e7,
		info:
			"A cranial implant that affects the user's personality, making them better " +
			"at negotiation in social situations.",
		work_money_mult: 1.1,
		company_rep_mult: 1.15,
		faction_rep_mult: 1.15,
		factions: [factionNames.TianDiHui],
	},
	{
		name: augNames.NeuroreceptorManager,
		repCost: 0.75e5,
		moneyCost: 5.5e8,
		info:
			"A brain implant carefully assembled around the synapses, which " +
			"micromanages the activity and levels of various neuroreceptor " +
			"chemicals and modulates electrical activity to optimize concentration, " +
			"allowing the user to multitask much more effectively.",
		stats:
			"This augmentation removes the penalty for not focusing on actions such as working in a job or working for a " +
			"faction.",
		factions: [factionNames.TianDiHui],
	},

	// Grafting-exclusive Augmentation
	{
		name: augNames.CongruityImplant,
		repCost: Infinity,
		moneyCost: 50e12,
		info:
			"Developed by a pioneer in Grafting research, this implant generates pulses of stability which seem to have a " +
			"nullifying effect versus the Entropy virus.\n\n" +
			"Note: For unknown reasons, the lowercase n appears to be an integral component to its " +
			"functionality.",
		stats: "This Augmentation removes the Entropy virus, and prevents it from affecting you again.",
		factions: [],
	}
];