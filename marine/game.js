const FIELD_SIZE = 3;
const SPOT_MS = 1100;

// iNaturalist photo licenses we are allowed to show in the gallery.
const OPEN_LICENSES = new Set([
  "cc0", "cc-by", "cc-by-nc", "cc-by-sa", "cc-by-nd", "cc-by-nc-sa", "cc-by-nc-nd", "pd",
]);
const GALLERY_MAX = 5;

// The logbook and sound preference are saved on the device so a returning
// child finds their own collection of spotted sea creatures again.
const STORE_KEY = "sea-life-spotter-collection-v1";
const SOUND_KEY = "sea-life-spotter-sound";

// Real marine groups, with kid-friendly names and a badge color.
const GROUPS = {
  eel: { name: "Eel", color: "#3b82c4" },
  shrimp: { name: "Shrimp", color: "#e07a5f" },
  seastar: { name: "Sea star", color: "#f2cc8f" },
  crab: { name: "Crab", color: "#c96f4a" },
  lobster: { name: "Lobster", color: "#b0562f" },
  cephalopod: { name: "Octopus & squid", color: "#7c6cd6" },
  fish: { name: "Fish", color: "#2f9d8f" },
  ray: { name: "Ray", color: "#4a9db0" },
  turtle: { name: "Sea turtle", color: "#8a9a4a" },
  mammal: { name: "Sea mammal", color: "#5c8a86" },
  jelly: { name: "Jelly", color: "#b06ab3" },
  shell: { name: "Shell & spine", color: "#7a8b99" },
};

// Every creature is a real species. `art` is the bundled illustration, `inat` is the
// iNaturalist taxon id used to load real photos, `facts` is a list of kid-friendly
// facts (each can be heard on its own), and `info` fills the stat rows.
const CREATURES = [
  {
    slug: "green-moray", name: "Green Moray Eel", sci: "Gymnothorax funebris",
    group: "eel", inat: 120125,
    facts: [
      "It looks green because yellow slime covers its blue-grey skin.",
      "It hides in reef holes with just its head poking out.",
      "It has a second set of jaws in its throat to pull food in.",
      "It can grow longer than a tall grown-up is tall!",
    ],
    info: {
      length: "Up to ~2.5 m (8 ft)",
      weight: "Up to ~30 kg (65 lb)",
      speed: "Quick in short bursts",
      lifespan: "~20-30 years",
      range: "Warm reefs of the western Atlantic and Caribbean",
      diet: "Fish, crabs, shrimp, and octopus",
    },
  },
  {
    slug: "ribbon-eel", name: "Ribbon Eel", sci: "Rhinomuraena quaesita",
    group: "eel", inat: 111716,
    facts: [
      "Young ones are black, then turn bright blue with a yellow snout.",
      "Old ribbon eels turn bright yellow all over.",
      "It has fancy leaf-like nostrils that look like little sails.",
      "It lives in sandy burrows on coral reefs.",
    ],
    info: {
      length: "Up to ~1.3 m (4 ft)",
      weight: "A few kilograms",
      speed: "Slow — mostly stays in its burrow",
      lifespan: "~20 years",
      range: "Tropical Indo-Pacific coral reefs",
      diet: "Small fish and shrimp",
    },
  },
  {
    slug: "garden-eel", name: "Spotted Garden Eel", sci: "Heteroconger hassi",
    group: "eel", inat: 153191,
    facts: [
      "Hundreds stick up from the sand like a garden of skinny plants.",
      "They duck into their burrows when a diver swims close.",
      "They catch tiny plankton floating by with their mouths.",
      "Each eel digs its own deep sand tube to live in.",
    ],
    info: {
      length: "Up to ~40 cm (16 in)",
      weight: "Just a few grams",
      speed: "Very slow — stays mostly in its hole",
      lifespan: "Several years",
      range: "Sandy patches near Indo-Pacific coral reefs",
      diet: "Tiny plankton drifting in the current",
    },
  },
  {
    slug: "snowflake-eel", name: "Snowflake Moray", sci: "Echidna nebulosa",
    group: "eel", inat: 54441,
    facts: [
      "Its white and black pattern looks like falling snowflakes.",
      "It loves crunching crabs with its strong blunt teeth.",
      "It is a popular aquarium eel because it is bold and pretty.",
      "It often hunts at night on the reef.",
    ],
    info: {
      length: "Up to ~1 m (3.3 ft)",
      weight: "A few kilograms",
      speed: "Quick in short lunges",
      lifespan: "~10-20 years",
      range: "Tropical Indo-Pacific reefs",
      diet: "Crabs and other crustaceans",
    },
  },
  {
    slug: "cleaner-shrimp", name: "Cleaner Shrimp", sci: "Lysmata amboinensis",
    group: "shrimp", inat: 121385,
    facts: [
      "It waves its white antennae to invite fish over for a clean.",
      "Fish let it crawl on them and pick off tiny pests.",
      "It has bright red-and-white bands that are easy to spot.",
      "Even big fish wait patiently in its cleaning station.",
    ],
    info: {
      length: "Up to ~6 cm (2.5 in)",
      weight: "A few grams",
      speed: "Quick little hops and walks",
      lifespan: "~2-3 years",
      range: "Tropical Indo-Pacific coral reefs",
      diet: "Tiny parasites and leftover bits on fish skin",
    },
  },
  {
    slug: "peacock-mantis", name: "Peacock Mantis Shrimp", sci: "Odontodactylus scyllarus",
    group: "shrimp", inat: 119395,
    facts: [
      "It punches so hard its smash can break a crab shell.",
      "Its punch is one of the fastest animal strikes on Earth.",
      "It can see many more colors than people can.",
      "It lives in burrows and peeks out with big stalked eyes.",
    ],
    info: {
      length: "Up to ~18 cm (7 in)",
      weight: "A few hundred grams",
      speed: "A lightning-fast punch",
      lifespan: "~3-6 years",
      range: "Tropical Indo-Pacific reefs",
      diet: "Crabs, snails, and other hard-shelled animals",
    },
  },
  {
    slug: "pistol-shrimp", name: "Pistol Shrimp", sci: "Alpheus heterochaelis",
    group: "shrimp", inat: 260291,
    facts: [
      "It snaps one giant claw shut to make a loud pop.",
      "The snap makes a tiny bubble that stuns small prey.",
      "Some share a burrow with a goby fish that keeps watch.",
      "The pop is one of the loudest sounds a small animal makes.",
    ],
    info: {
      length: "Up to ~5 cm (2 in)",
      weight: "A few grams",
      speed: "Slow walker, instant snap",
      lifespan: "~1-2 years",
      range: "Warm shallow coasts of the western Atlantic",
      diet: "Small worms, shrimp, and bits of food",
    },
  },
  {
    slug: "banded-coral-shrimp", name: "Banded Coral Shrimp", sci: "Stenopus hispidus",
    group: "shrimp", inat: 121669,
    facts: [
      "It has long white antennae and bold red-and-white bands.",
      "It also cleans parasites off reef fish.",
      "Mates often hold claws and stay together for a long time.",
      "It lives in caves and under coral ledges.",
    ],
    info: {
      length: "Up to ~6 cm (2.5 in) — not counting antennae",
      weight: "A few grams",
      speed: "Quick little walks",
      lifespan: "~2-3 years",
      range: "Warm coral reefs worldwide",
      diet: "Parasites, leftover food, and tiny animals",
    },
  },
  {
    slug: "blue-starfish", name: "Blue Sea Star", sci: "Linckia laevigata",
    group: "seastar", inat: 57745,
    facts: [
      "It is a bright electric blue — easy to spot on the reef!",
      "Like other sea stars, it can grow back a lost arm.",
      "It creeps along on hundreds of tiny tube feet.",
      "It helps clean the reef by eating leftover bits and algae.",
    ],
    info: {
      length: "Up to ~30 cm (12 in) across",
      weight: "A few hundred grams",
      speed: "Very slow crawling",
      lifespan: "~5-10 years",
      range: "Shallow Indo-Pacific coral reefs",
      diet: "Detritus, algae, and tiny reef scraps",
    },
  },
  {
    slug: "crown-of-thorns", name: "Crown-of-Thorns", sci: "Acanthaster planci",
    group: "seastar", inat: 50915,
    facts: [
      "It is covered in long, sharp, venomous spines.",
      "It eats coral polyps and can leave bare white scars.",
      "It can have more than a dozen arms.",
      "When too many gather, reefs can be badly damaged.",
    ],
    info: {
      length: "Up to ~35 cm (14 in) across",
      weight: "Up to ~1 kg (2 lb)",
      speed: "Slow crawling",
      lifespan: "~5-8 years",
      range: "Tropical Indo-Pacific coral reefs",
      diet: "Living coral polyps",
    },
  },
  {
    slug: "common-starfish", name: "Common Sea Star", sci: "Asterias rubens",
    group: "seastar", inat: 120138,
    facts: [
      "It usually has five arms, but sometimes grows more.",
      "It pulls open mussel shells with its strong arms.",
      "It pushes its stomach out of its mouth to digest food.",
      "You can find it in rock pools and on cool sea floors.",
    ],
    info: {
      length: "Up to ~30 cm (12 in) across",
      weight: "A few hundred grams",
      speed: "Slow crawling",
      lifespan: "~5-10 years",
      range: "Cool coasts of the North Atlantic",
      diet: "Mussels, clams, and other shellfish",
    },
  },
  {
    slug: "sunflower-star", name: "Sunflower Sea Star", sci: "Pycnopodia helianthoides",
    group: "seastar", inat: 47673,
    facts: [
      "It can have up to 24 arms — like a sunny flower!",
      "It is one of the biggest and fastest sea stars.",
      "It hunts snails, sea urchins, and other sea-floor animals.",
      "Many disappeared after a big sea-star disease, so they are rare now.",
    ],
    info: {
      length: "Up to ~1 m (3.3 ft) across",
      weight: "Up to ~5 kg (11 lb)",
      speed: "Fast for a sea star",
      lifespan: "~5-10 years or more",
      range: "Cool Pacific coasts of North America",
      diet: "Sea urchins, snails, and other invertebrates",
    },
  },
  {
    slug: "blue-crab", name: "Blue Crab", sci: "Callinectes sapidus",
    group: "crab", inat: 49504,
    facts: [
      "Its shell is olive-green, but its claws are bright blue.",
      "Its name means 'savory beautiful swimmer'.",
      "It can swim sideways using paddle-shaped back legs.",
      "Young crabs grow by molting and leaving their old shell behind.",
    ],
    info: {
      length: "Shell up to ~23 cm (9 in) wide",
      weight: "Up to ~1 kg (2 lb)",
      speed: "A strong sideways swimmer",
      lifespan: "~3-4 years",
      range: "Atlantic and Gulf coasts of the Americas",
      diet: "Clams, fish, worms, and plants",
    },
  },
  {
    slug: "hermit-crab", name: "Hermit Crab", sci: "Pagurus bernhardus",
    group: "crab", inat: 152975,
    facts: [
      "It lives in empty snail shells to protect its soft belly.",
      "When it grows, it must find a bigger shell to move into.",
      "Hermit crabs sometimes line up to swap shells.",
      "Its big claw can block the shell opening like a door.",
    ],
    info: {
      length: "Body up to ~10 cm (4 in)",
      weight: "A few dozen grams",
      speed: "A careful walker",
      lifespan: "~5-10 years",
      range: "Rocky coasts of the Northeast Atlantic",
      diet: "Leftovers, algae, and tiny animals",
    },
  },
  {
    slug: "spider-crab", name: "Spider Crab", sci: "Libinia emarginata",
    group: "crab", inat: 53740,
    facts: [
      "It has long skinny legs like a spider.",
      "It sticks seaweed and sponges on its shell for camouflage.",
      "It walks slowly over muddy and sandy sea floors.",
      "Its pointed snout helps it poke into the mud for food.",
    ],
    info: {
      length: "Shell up to ~10 cm (4 in)",
      weight: "A few hundred grams",
      speed: "Slow walker",
      lifespan: "~3-5 years",
      range: "Atlantic coasts of North America",
      diet: "Algae, worms, and leftover scraps",
    },
  },
  {
    slug: "fiddler-crab", name: "Fiddler Crab", sci: "Leptuca pugilator",
    group: "crab", inat: 555968,
    facts: [
      "Male fiddler crabs have one huge claw and one tiny claw.",
      "They wave the big claw like a fiddle to say hello to mates.",
      "They live in muddy burrows in salt marshes.",
      "They scoop mud with the small claw to find tiny bits of food.",
    ],
    info: {
      length: "Shell up to ~2.5 cm (1 in)",
      weight: "A few grams",
      speed: "Quick sideways scuttle",
      lifespan: "~1-2 years",
      range: "Salt marshes of the western Atlantic",
      diet: "Tiny bits of food in the mud and sand",
    },
  },
  {
    slug: "ghost-crab", name: "Ghost Crab", sci: "Ocypode quadrata",
    group: "crab", inat: 53875,
    facts: [
      "It is pale like a ghost and hard to see on the sand.",
      "It digs deep burrows on sandy ocean beaches.",
      "It can run surprisingly fast across the sand.",
      "Its eyes sit up on tall stalks to spot danger.",
    ],
    info: {
      length: "Shell up to ~5 cm (2 in)",
      weight: "A few dozen grams",
      speed: "One of the fastest crabs on sand",
      lifespan: "~3 years",
      range: "Sandy beaches of the western Atlantic",
      diet: "Tiny animals, plants, and beach leftovers",
    },
  },
  {
    slug: "horseshoe-crab", name: "Horseshoe Crab", sci: "Limulus polyphemus",
    group: "crab", inat: 48302,
    facts: [
      "It is not a true crab — it is more closely related to spiders!",
      "It has looked almost the same for hundreds of millions of years.",
      "Its blue blood is used to help keep medicines safe for people.",
      "It has a long spiked tail it uses to flip itself over.",
    ],
    info: {
      length: "Up to ~60 cm (2 ft) including the tail",
      weight: "Up to ~5 kg (11 lb)",
      speed: "Slow crawler",
      lifespan: "~20-40 years",
      range: "Atlantic coasts of North America",
      diet: "Worms, clams, and other small sea-floor animals",
    },
  },
  {
    slug: "american-lobster", name: "American Lobster", sci: "Homarus americanus",
    group: "lobster", inat: 61383,
    facts: [
      "It has one big crushing claw and one sharp cutting claw.",
      "Most are dark green-brown, but rare ones can be bright blue.",
      "It tastes with its legs and smells with its antennae.",
      "It can live a very long time if it stays safe in the deep.",
    ],
    info: {
      length: "Usually ~50 cm (20 in); rarely much bigger",
      weight: "Usually 0.5-4 kg (1-9 lb)",
      speed: "Walks forward, swims backward with a tail flip",
      lifespan: "~50 years or more",
      range: "Cold North Atlantic coasts",
      diet: "Fish, crabs, clams, and leftover food",
    },
  },
  {
    slug: "spiny-lobster", name: "Spiny Lobster", sci: "Panulirus argus",
    group: "lobster", inat: 47299,
    facts: [
      "It has no big claws — just long spiny antennae.",
      "It hides in reef caves by day and walks out at night.",
      "Groups sometimes march in single-file lines across the sand.",
      "Its antennae can sense movement and help it feel safe.",
    ],
    info: {
      length: "Up to ~60 cm (2 ft)",
      weight: "Up to ~4 kg (9 lb)",
      speed: "Walks forward, shoots backward when scared",
      lifespan: "~20 years or more",
      range: "Warm reefs of the western Atlantic and Caribbean",
      diet: "Snails, crabs, sea urchins, and leftover bits",
    },
  },
  {
    slug: "slipper-lobster", name: "Slipper Lobster", sci: "Thenus orientalis",
    group: "lobster", inat: 114048,
    facts: [
      "Its flat head plates look a bit like a slipper or shovel.",
      "It digs into sand and mud to hide from predators.",
      "It has no big claws and is flatter than other lobsters.",
      "It hunts small animals on the soft sea floor.",
    ],
    info: {
      length: "Up to ~25 cm (10 in)",
      weight: "Up to ~0.5 kg (1 lb)",
      speed: "Slow digger and walker",
      lifespan: "~5-10 years",
      range: "Warm shallow seas of the Indo-Pacific",
      diet: "Worms, small clams, and other soft-bottom animals",
    },
  },
  {
    slug: "common-octopus", name: "Common Octopus", sci: "Octopus vulgaris",
    group: "cephalopod", inat: 49315,
    facts: [
      "It has eight arms lined with suckers for tasting and grabbing.",
      "It can squeeze through tiny gaps because it has no bones.",
      "It can change color and texture in the blink of an eye.",
      "It is one of the smartest animals in the ocean.",
    ],
    info: {
      length: "Arms span up to ~1 m (3 ft)",
      weight: "Up to ~10 kg (22 lb)",
      speed: "Jet-propelled bursts",
      lifespan: "~1-2 years",
      range: "Warm and temperate seas worldwide",
      diet: "Crabs, clams, and shrimp",
    },
  },
  {
    slug: "blue-ringed-octopus", name: "Blue-Ringed Octopus", sci: "Hapalochlaena lunulata",
    group: "cephalopod", inat: 199917,
    facts: [
      "Bright blue rings flash when it feels threatened.",
      "It is tiny, but its bite is extremely venomous.",
      "It hides in rock pools and under shells near shore.",
      "Most of the time it is calm and just wants to be left alone.",
    ],
    info: {
      length: "Only ~10-20 cm (4-8 in) across",
      weight: "About 50-100 g (2-4 oz)",
      speed: "Quick crawls and short swims",
      lifespan: "~1-2 years",
      range: "Shallow reefs of the western Pacific",
      diet: "Small crabs and shrimp",
    },
  },
  {
    slug: "giant-pacific-octopus", name: "Giant Pacific Octopus", sci: "Enteroctopus dofleini",
    group: "cephalopod", inat: 48863,
    facts: [
      "It is the biggest octopus in the world.",
      "Its arms can stretch longer than a small car.",
      "It can open jars and solve puzzles in aquariums.",
      "A mother guards her eggs until they hatch, then her life ends.",
    ],
    info: {
      length: "Arms span up to ~4-5 m (13-16 ft)",
      weight: "Up to ~50 kg (110 lb) or more",
      speed: "Strong jet bursts",
      lifespan: "~3-5 years",
      range: "Cold North Pacific coastal waters",
      diet: "Crabs, clams, shrimp, and fish",
    },
  },
  {
    slug: "cuttlefish", name: "Cuttlefish", sci: "Sepia officinalis",
    group: "cephalopod", inat: 151429,
    facts: [
      "It can change color patterns like a living screen.",
      "It has a hard inner shell called a cuttlebone.",
      "It shoots out a cloud of dark ink to escape danger.",
      "Its W-shaped pupils help it see very well underwater.",
    ],
    info: {
      length: "Up to ~45 cm (18 in)",
      weight: "Up to ~2-4 kg (4-9 lb)",
      speed: "Hovering fins plus jet bursts",
      lifespan: "~1-2 years",
      range: "Coastal Atlantic and Mediterranean seas",
      diet: "Shrimp, crabs, and small fish",
    },
  },
  {
    slug: "chambered-nautilus", name: "Chambered Nautilus", sci: "Nautilus pompilius",
    group: "cephalopod", inat: 123467,
    facts: [
      "It lives in a spiral shell full of gas-filled rooms.",
      "It is sometimes called a living fossil.",
      "It has lots of short tentacles without suckers.",
      "It rises at night and sinks deeper by day.",
    ],
    info: {
      length: "Shell up to ~20 cm (8 in) across",
      weight: "About 1 kg (2 lb)",
      speed: "Slow jet swimming",
      lifespan: "~15-20 years",
      range: "Deep Indo-Pacific reefs and slopes",
      diet: "Shrimp, leftover fish, and small crabs",
    },
  },
  {
    slug: "giant-squid", name: "Giant Squid", sci: "Architeuthis dux",
    group: "cephalopod", inat: 253698,
    facts: [
      "It is one of the biggest invertebrates that ever lived.",
      "Its eyes are as big as dinner plates — the largest in the animal world.",
      "It battles sperm whales in the deep dark ocean.",
      "People almost never see a living one because it stays so deep.",
    ],
    info: {
      length: "Up to ~10-13 m (33-43 ft) including tentacles",
      weight: "Up to ~275 kg (600 lb)",
      speed: "Powerful deep-sea jets",
      lifespan: "~5 years (estimated)",
      range: "Deep oceans worldwide",
      diet: "Deep-sea fish and other squid",
    },
  },
  {
    slug: "bobtail-squid", name: "Bobtail Squid", sci: "Euprymna scolopes",
    group: "cephalopod", inat: 143624,
    facts: [
      "It is tiny and cute, with a short round body.",
      "It buries itself in sand by day with only its eyes showing.",
      "Friendly glowing bacteria help hide its shadow at night.",
      "Scientists study it to learn how animals live with helpful microbes.",
    ],
    info: {
      length: "Only ~3 cm (1 in)",
      weight: "A few grams",
      speed: "Quick little hops and jets",
      lifespan: "~2-10 months",
      range: "Shallow sandy reefs around Hawaii",
      diet: "Tiny shrimp and other small animals",
    },
  },
  {
    slug: "clownfish", name: "Clownfish", sci: "Amphiprion ocellaris",
    group: "fish", inat: 132688,
    facts: [
      "It lives safely among the stinging tentacles of a sea anemone.",
      "Special slime on its skin keeps the stings from hurting it.",
      "All clownfish start life as males; the biggest can become female.",
      "It makes a little home and rarely wanders far from its anemone.",
    ],
    info: {
      length: "Up to ~11 cm (4 in)",
      weight: "A few dozen grams",
      speed: "Quick darting swimmer",
      lifespan: "~6-10 years",
      range: "Warm Indo-Pacific coral reefs",
      diet: "Algae, tiny plankton, and leftover scraps",
    },
  },
  {
    slug: "blue-tang", name: "Blue Tang", sci: "Paracanthurus hepatus",
    group: "fish", inat: 130879,
    facts: [
      "It is famous for its bright blue body and yellow tail.",
      "A young blue tang is bright yellow all over.",
      "It uses a sharp spine near its tail for defense.",
      "It helps clean the reef by nibbling algae.",
    ],
    info: {
      length: "Up to ~30 cm (12 in)",
      weight: "Up to ~0.6 kg (1.3 lb)",
      speed: "Fast and agile",
      lifespan: "~8-20 years",
      range: "Tropical Indo-Pacific coral reefs",
      diet: "Algae and tiny plankton",
    },
  },
  {
    slug: "lined-seahorse", name: "Lined Seahorse", sci: "Hippocampus erectus",
    group: "fish", inat: 54540,
    facts: [
      "It swims upright and holds on with a curly prehensile tail.",
      "Dad carries the babies in a special pouch until they are ready.",
      "It has no stomach, so it nibbles tiny food all day long.",
      "Its eyes can look in two different directions at once.",
    ],
    info: {
      length: "Up to ~17 cm (7 in)",
      weight: "A few grams",
      speed: "Very slow fluttering",
      lifespan: "~3-5 years",
      range: "Western Atlantic coasts and seagrass beds",
      diet: "Tiny shrimp and other plankton",
    },
  },
  {
    slug: "leafy-seadragon", name: "Leafy Seadragon", sci: "Phycodurus eques",
    group: "fish", inat: 49105,
    facts: [
      "Leafy flaps on its body make it look like floating seaweed.",
      "It drifts with the current instead of swimming hard.",
      "Dad carries sticky eggs on the underside of his tail.",
      "It is found only along the southern coast of Australia.",
    ],
    info: {
      length: "Up to ~35 cm (14 in)",
      weight: "A few dozen grams",
      speed: "Very slow drifting",
      lifespan: "~5-10 years",
      range: "Kelp and seaweed beds of southern Australia",
      diet: "Tiny shrimp-like mysids",
    },
  },
  {
    slug: "lionfish", name: "Lionfish", sci: "Pterois volitans",
    group: "fish", inat: 47280,
    facts: [
      "Its fancy fins look like a lion's mane.",
      "Venomous spines can give a painful sting.",
      "It is a skilled hunter of small reef fish.",
      "Outside its home range it can take over reefs as an invader.",
    ],
    info: {
      length: "Up to ~38 cm (15 in)",
      weight: "Up to ~1 kg (2 lb)",
      speed: "Slow cruiser, quick strike",
      lifespan: "~10-15 years",
      range: "Native to the Indo-Pacific; invasive in the Atlantic",
      diet: "Small fish and shrimp",
    },
  },
  {
    slug: "pufferfish", name: "Pufferfish", sci: "Arothron hispidus",
    group: "fish", inat: 144017,
    facts: [
      "It gulps water to puff into a round spiky ball.",
      "Puffing up makes it much harder for a predator to swallow.",
      "Some puffers carry a strong toxin in their bodies.",
      "It has a beak-like mouth for crunching crabs and snails.",
    ],
    info: {
      length: "Up to ~50 cm (20 in)",
      weight: "Up to ~2 kg (4 lb)",
      speed: "Slow, with quick puffs of speed",
      lifespan: "~10 years",
      range: "Warm Indo-Pacific reefs and lagoons",
      diet: "Crabs, snails, sponges, and algae",
    },
  },
  {
    slug: "mandarinfish", name: "Mandarinfish", sci: "Synchiropus splendidus",
    group: "fish", inat: 56072,
    facts: [
      "It looks like it was painted with swirling blue and orange ink.",
      "Its bright colors come from special skin cells, not just pigment.",
      "It is tiny and shy, hiding among coral rubble.",
      "Pairs often dance together at dusk.",
    ],
    info: {
      length: "Up to ~6 cm (2.5 in)",
      weight: "A few grams",
      speed: "Slow hovering and short hops",
      lifespan: "~2-4 years",
      range: "Western Pacific coral reefs",
      diet: "Tiny crustaceans and worms",
    },
  },
  {
    slug: "parrotfish", name: "Parrotfish", sci: "Scarus guacamaia",
    group: "fish", inat: 112148,
    facts: [
      "Its beak looks like a parrot's bill for scraping algae off coral.",
      "It grinds coral bits and poops out fine white sand.",
      "Some beaches are partly made of parrotfish sand!",
      "At night it may sleep in a mucus bubble like a sleeping bag.",
    ],
    info: {
      length: "Up to ~1.2 m (4 ft)",
      weight: "Up to ~20 kg (44 lb)",
      speed: "A strong reef swimmer",
      lifespan: "~10-20 years",
      range: "Caribbean and western Atlantic reefs",
      diet: "Algae scraped from coral rock",
    },
  },
  {
    slug: "emperor-angelfish", name: "Emperor Angelfish", sci: "Pomacanthus imperator",
    group: "fish", inat: 84181,
    facts: [
      "Adults wear bold blue-and-yellow stripes like a royal robe.",
      "Babies look totally different, with blue rings and swirls.",
      "It has a sharp spine on its gill cover for protection.",
      "It often lives as a mated pair on the reef.",
    ],
    info: {
      length: "Up to ~40 cm (16 in)",
      weight: "Up to ~2 kg (4 lb)",
      speed: "Agile reef swimmer",
      lifespan: "~20 years or more",
      range: "Tropical Indo-Pacific coral reefs",
      diet: "Sponges, tunicates, and leftover bits",
    },
  },
  {
    slug: "flying-fish", name: "Flying Fish", sci: "Exocoetus volitans",
    group: "fish", inat: 120657,
    facts: [
      "It leaps from the water and glides on wing-like fins.",
      "A good glide can carry it as far as a football field.",
      "Gliding helps it escape hungry dolphins and tuna.",
      "It lives near the surface of the open ocean.",
    ],
    info: {
      length: "Up to ~30 cm (12 in)",
      weight: "A few hundred grams",
      speed: "Fast swimmer and long glider",
      lifespan: "~5 years",
      range: "Warm open oceans worldwide",
      diet: "Tiny plankton near the surface",
    },
  },
  {
    slug: "manta-ray", name: "Manta Ray", sci: "Mobula birostris",
    group: "ray", inat: 623966,
    facts: [
      "It is one of the biggest rays, with a wingspan like a small plane.",
      "It flaps huge wing-like fins to 'fly' through the water.",
      "It filters tiny plankton with its wide open mouth.",
      "Divers love swimming near these gentle giants.",
    ],
    info: {
      length: "Wingspan up to ~7 m (23 ft)",
      weight: "Up to ~2,000 kg (4,400 lb)",
      speed: "Graceful cruiser",
      lifespan: "~40 years or more",
      range: "Warm open oceans worldwide",
      diet: "Plankton filtered from the water",
    },
  },
  {
    slug: "stingray", name: "Southern Stingray", sci: "Hypanus americanus",
    group: "ray", inat: 623850,
    facts: [
      "It has a flat diamond-shaped body and a long whip tail.",
      "A venomous spine on the tail helps it stay safe.",
      "It buries itself in sand with only its eyes showing.",
      "It flaps its fins to uncover worms and crabs in the sand.",
    ],
    info: {
      length: "Disc up to ~1.5 m (5 ft) wide",
      weight: "Up to ~100 kg (220 lb)",
      speed: "Smooth gliding over the sand",
      lifespan: "~15-25 years",
      range: "Warm western Atlantic and Caribbean shallows",
      diet: "Worms, crabs, and clams",
    },
  },
  {
    slug: "green-sea-turtle", name: "Green Sea Turtle", sci: "Chelonia mydas",
    group: "turtle", inat: 39659,
    facts: [
      "Adults mostly eat seagrass and algae, which can tint their fat green.",
      "They migrate huge distances between feeding and nesting beaches.",
      "Baby turtles dash to the sea right after hatching.",
      "They cannot pull their heads into their shells like land turtles.",
    ],
    info: {
      length: "Shell up to ~1.5 m (5 ft)",
      weight: "Up to ~200 kg (440 lb)",
      speed: "A strong ocean swimmer",
      lifespan: "~70 years or more",
      range: "Warm oceans worldwide",
      diet: "Seagrass and algae (adults)",
    },
  },
  {
    slug: "leatherback", name: "Leatherback Turtle", sci: "Dermochelys coriacea",
    group: "turtle", inat: 39677,
    facts: [
      "It is the biggest sea turtle and has a soft leathery shell.",
      "It can dive deeper than almost any other turtle.",
      "Its favorite food is jelly animals.",
      "Ridges on its shell help it slip smoothly through the water.",
    ],
    info: {
      length: "Up to ~2 m (6.5 ft)",
      weight: "Up to ~900 kg (2,000 lb)",
      speed: "A powerful long-distance swimmer",
      lifespan: "~30-50 years or more",
      range: "Oceans worldwide, even cool waters",
      diet: "Jellyfish and other soft gelatinous animals",
    },
  },
  {
    slug: "bottlenose-dolphin", name: "Bottlenose Dolphin", sci: "Tursiops truncatus",
    group: "mammal", inat: 41482,
    facts: [
      "It breathes air through a blowhole on top of its head.",
      "It uses clicks and whistles to talk and find food.",
      "Dolphins live in friendly groups called pods.",
      "It is famous for leaping and playing in waves.",
    ],
    info: {
      length: "Up to ~4 m (13 ft)",
      weight: "Up to ~300 kg (660 lb)",
      speed: "Up to ~35 km/h (22 mph)",
      lifespan: "~40-60 years",
      range: "Warm and temperate seas worldwide",
      diet: "Fish and squid",
    },
  },
  {
    slug: "orca", name: "Orca", sci: "Orcinus orca",
    group: "mammal", inat: 41521,
    facts: [
      "It is the biggest dolphin — sometimes called a killer whale.",
      "Family groups hunt together with clever teamwork.",
      "Different orca groups can have their own favorite foods.",
      "Its bold black-and-white pattern is easy to recognize.",
    ],
    info: {
      length: "Up to ~9 m (30 ft)",
      weight: "Up to ~6,000 kg (13,000 lb)",
      speed: "Up to ~55 km/h (34 mph) in bursts",
      lifespan: "~50-90 years",
      range: "Oceans worldwide, from poles to tropics",
      diet: "Fish, seals, or even whales — depending on the group",
    },
  },
  {
    slug: "sea-otter", name: "Sea Otter", sci: "Enhydra lutris",
    group: "mammal", inat: 41860,
    facts: [
      "It has the thickest fur of any animal to stay warm.",
      "It floats on its back and uses rocks to crack open shells.",
      "Mothers carry babies on their tummies while floating.",
      "It helps kelp forests by eating sea urchins.",
    ],
    info: {
      length: "Up to ~1.5 m (5 ft)",
      weight: "Up to ~45 kg (100 lb)",
      speed: "A strong swimmer and diver",
      lifespan: "~15-20 years",
      range: "North Pacific coastal kelp forests",
      diet: "Sea urchins, crabs, clams, and snails",
    },
  },
  {
    slug: "moon-jelly", name: "Moon Jelly", sci: "Aurelia aurita",
    group: "jelly", inat: 48328,
    facts: [
      "It looks like a pale glowing saucer drifting in the sea.",
      "Four circle shapes in the middle are its reproductive organs.",
      "Its sting is very mild to most people.",
      "It pulses gently to move and catch tiny plankton.",
    ],
    info: {
      length: "Bell up to ~40 cm (16 in) across",
      weight: "Mostly water — very light",
      speed: "Slow pulsing drift",
      lifespan: "~1 year or less in the wild",
      range: "Coastal seas worldwide",
      diet: "Tiny plankton and larval animals",
    },
  },
  {
    slug: "lions-mane", name: "Lion's Mane Jelly", sci: "Cyanea capillata",
    group: "jelly", inat: 69838,
    facts: [
      "It has a huge frilly bell and trailing tentacles like a mane.",
      "The biggest ones can have tentacles longer than a bus.",
      "It lives in cool northern seas.",
      "Its sting can hurt, so look but don't touch!",
    ],
    info: {
      length: "Bell up to ~2 m (6.5 ft); tentacles much longer",
      weight: "Mostly water",
      speed: "Slow pulsing drift",
      lifespan: "About one year",
      range: "Cold northern Atlantic and Pacific waters",
      diet: "Small fish, tiny jellies, and plankton",
    },
  },
  {
    slug: "portuguese-man-o-war", name: "Portuguese Man o' War", sci: "Physalia physalis",
    group: "jelly", inat: 117302,
    facts: [
      "It looks like one animal but is a colony of tiny zooids.",
      "Its blue float sits above the water like a tiny sail.",
      "Long tentacles trail below and pack a strong sting.",
      "Wind pushes the sail so it drifts across the open ocean.",
    ],
    info: {
      length: "Float ~15 cm (6 in); tentacles up to ~30 m (100 ft)",
      weight: "Mostly water",
      speed: "Wind-blown drifting",
      lifespan: "Months to about a year",
      range: "Warm open oceans worldwide",
      diet: "Small fish and plankton caught by tentacles",
    },
  },
  {
    slug: "giant-clam", name: "Giant Clam", sci: "Tridacna gigas",
    group: "shell", inat: 114396,
    facts: [
      "It is the biggest clam in the world.",
      "Colorful algae live in its soft mantle and help feed it.",
      "It stays stuck in one spot on the reef for life.",
      "Its shell can be as heavy as a small motorcycle.",
    ],
    info: {
      length: "Up to ~1.2 m (4 ft)",
      weight: "Up to ~200 kg (440 lb)",
      speed: "Stays in place",
      lifespan: "~100 years or more",
      range: "Shallow Indo-Pacific coral reefs",
      diet: "Plankton plus sugar from partner algae",
    },
  },
  {
    slug: "purple-urchin", name: "Purple Sea Urchin", sci: "Strongylocentrotus purpuratus",
    group: "shell", inat: 48035,
    facts: [
      "It is a round ball covered in purple spines.",
      "It scrapes algae off rocks with a mouth on its underside.",
      "Too many urchins can turn kelp forests into bare rock.",
      "Sea otters love to eat them and help keep numbers in check.",
    ],
    info: {
      length: "Up to ~10 cm (4 in) across",
      weight: "A few hundred grams",
      speed: "Very slow crawling",
      lifespan: "~50 years or more",
      range: "Pacific coasts of North America",
      diet: "Kelp and other algae",
    },
  },
];

// Inline speaker icon so the "read it aloud" buttons look the same on every
// device (emoji glyphs render inconsistently across systems).
const SPEAKER_SVG =
  '<svg class="speaker-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3z"/>' +
  '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 8.5a5 5 0 0 1 0 7M18.8 6a9 9 0 0 1 0 12"/>' +
  "</svg>";

const STAT_ROWS = [
  ["Scientific name", "sci"],
  ["Size", "length"],
  ["Weight", "weight"],
  ["Top speed", "speed"],
  ["Lifespan", "lifespan"],
  ["Where it lives", "range"],
  ["What it eats", "diet"],
];

const fieldEl = document.getElementById("field");
const cheerEl = document.getElementById("cheer");
const progressEl = document.getElementById("progress");
const caughtListEl = document.getElementById("caught-list");
const soundBtn = document.getElementById("sound-toggle");
const resetBtn = document.getElementById("reset-btn");

const field = [];
const spotted = [];
const slotButtons = [];
let locked = false;

let soundOn = loadSound();

/* ---------- Saving progress on the device ---------- */

function loadSpotted() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const slugs = raw ? JSON.parse(raw) : [];
    return Array.isArray(slugs) ? slugs : [];
  } catch (err) {
    return [];
  }
}

function saveSpotted() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(spotted.map((s) => s.slug)));
  } catch (err) {
    /* storage may be unavailable (e.g. private mode) — the game still works */
  }
}

function loadSound() {
  try {
    return localStorage.getItem(SOUND_KEY) !== "off";
  } catch (err) {
    return true;
  }
}

function saveSound() {
  try {
    localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off");
  } catch (err) {
    /* ignore */
  }
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function artUrl(creature) {
  return `art/${creature.slug}.webp`;
}

/* ---------- Speech ---------- */

function cancelSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function speak(text) {
  if (!soundOn || !window.speechSynthesis || !text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  u.pitch = 1.0;
  window.speechSynthesis.speak(u);
}

/* ---------- Happy sounds (Web Audio) ---------- */

let audioCtx = null;

function getAudioCtx() {
  if (audioCtx) return audioCtx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  audioCtx = new AC();
  return audioCtx;
}

function playTone(freq, start, dur, gain, type) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  const t0 = ctx.currentTime + start;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

// A short, friendly chime. "new" and "complete" are extra celebratory.
function playChime(kind) {
  if (!soundOn) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  if (kind === "complete") {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, i * 0.14, 0.5, 0.18, "triangle"));
  } else if (kind === "new") {
    [659.25, 830.61, 987.77].forEach((f, i) => playTone(f, i * 0.1, 0.35, 0.16, "triangle"));
  } else {
    [587.33, 880].forEach((f, i) => playTone(f, i * 0.09, 0.26, 0.13, "sine"));
  }
}

/* ---------- Confetti / bubble burst ---------- */

const BURST_COLORS = ["#58e0d6", "#ffd166", "#ff8fab", "#8ecae6", "#c8f76b", "#ffffff"];

function burstAt(x, y, big) {
  const layer = document.createElement("div");
  layer.className = "burst";
  layer.style.left = `${x}px`;
  layer.style.top = `${y}px`;
  const n = big ? 22 : 12;
  for (let i = 0; i < n; i += 1) {
    const dot = document.createElement("span");
    dot.className = "burst-dot";
    const angle = (Math.PI * 2 * i) / n + Math.random() * 0.6;
    const dist = (big ? 90 : 60) + Math.random() * (big ? 80 : 40);
    dot.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    dot.style.setProperty("--dy", `${Math.sin(angle) * dist - 20}px`);
    dot.style.background = BURST_COLORS[i % BURST_COLORS.length];
    dot.style.animationDelay = `${Math.random() * 0.05}s`;
    layer.appendChild(dot);
  }
  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 1100);
}

// Big party when the whole collection is complete.
function celebrateAll() {
  cheerEl.textContent = "WOW! You found ALL the sea creatures! You are a sea life expert!";
  playChime("complete");
  cancelSpeech();
  speak("Wow! You found all the sea creatures! You are a sea life expert!");
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < 5; i += 1) {
    window.setTimeout(() => burstAt(Math.random() * w, h * 0.1 + Math.random() * h * 0.5, true), i * 180);
  }
}

// Say a single phrase on its own (used by the little speaker buttons).
function speakField(text) {
  cancelSpeech();
  speak(text);
}

// Read the whole info card out loud, one piece at a time.
function speakAll(creature) {
  cancelSpeech();
  speak(creature.name);
  speak(`This is a ${GROUPS[creature.group].name}.`);
  STAT_ROWS.forEach(([label, key]) => {
    const value = key === "sci" ? creature.sci : creature.info[key];
    if (value) speak(`${label}. ${value}.`);
  });
  creature.facts.forEach((f) => speak(f));
}

function article(name) {
  return /^[aeiou]/i.test(name) ? "an" : "a";
}

function makeSayButton(label, onSay) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "say-btn";
  btn.setAttribute("aria-label", label);
  btn.innerHTML = SPEAKER_SVG;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    onSay();
  });
  return btn;
}

function setGroupRow(row, creature) {
  const group = GROUPS[creature.group];
  row.querySelector(".group-dot").style.background = group.color;
  row.querySelector(".group-name").textContent = group.name;
}

function makeGroupRow() {
  const row = document.createElement("span");
  row.className = "group-row";
  const dot = document.createElement("span");
  dot.className = "group-dot";
  dot.setAttribute("aria-hidden", "true");
  const name = document.createElement("span");
  name.className = "group-name";
  row.append(dot, name);
  return row;
}

function makeArt(creature, eager) {
  const wrap = document.createElement("span");
  wrap.className = "creature-art";
  const img = document.createElement("img");
  img.src = artUrl(creature);
  img.alt = creature.name;
  img.loading = eager ? "eager" : "lazy";
  img.draggable = false;
  wrap.appendChild(img);
  return wrap;
}

function pickSpawn(excludeSlugs) {
  const pool = CREATURES.filter((s) => !excludeSlugs.includes(s.slug));
  const source = pool.length ? pool : CREATURES;
  return source[randomInt(0, source.length - 1)];
}

function updateProgress() {
  progressEl.textContent = `Spotted ${spotted.length} of ${CREATURES.length} sea creatures`;
}

function fillCard(btn, creature, index) {
  btn.dataset.index = String(index);
  btn.classList.remove("spotting");
  btn.setAttribute("aria-label", `Spot the ${creature.name}`);
  btn.querySelector(".creature-art img").src = artUrl(creature);
  btn.querySelector(".creature-art img").alt = creature.name;
  btn.querySelector(".creature-name").textContent = creature.name;
  setGroupRow(btn.querySelector(".group-row"), creature);
}

function makeFieldCard(index) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "creature-card";

  const name = document.createElement("span");
  name.className = "creature-name";
  const splash = document.createElement("span");
  splash.className = "splash";
  splash.setAttribute("aria-hidden", "true");

  btn.append(makeArt(field[index], true), name, makeGroupRow(), splash);
  btn.addEventListener("click", () => onSpot(Number(btn.dataset.index)));
  fillCard(btn, field[index], index);
  return btn;
}

function renderSpotted() {
  caughtListEl.replaceChildren();
  if (!spotted.length) {
    const empty = document.createElement("p");
    empty.className = "caught-empty";
    empty.textContent = "No sea creatures yet — tap one above!";
    caughtListEl.appendChild(empty);
    return;
  }

  spotted.forEach((creature) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "caught-card";
    btn.setAttribute("aria-label", `Open the info card for the ${creature.name}`);

    const name = document.createElement("span");
    name.className = "caught-name";
    name.textContent = creature.name;
    const hint = document.createElement("span");
    hint.className = "tap-hint";
    hint.textContent = "Tap for info";

    const row = makeGroupRow();
    setGroupRow(row, creature);

    btn.append(makeArt(creature, false), name, row, hint);
    btn.addEventListener("click", () => openInfo(creature));
    li.appendChild(btn);
    caughtListEl.appendChild(li);
  });
}

function addToSpotted(creature) {
  if (spotted.some((s) => s.slug === creature.slug)) return;
  spotted.push(creature);
  saveSpotted();
  renderSpotted();
  updateProgress();
}

function onSpot(index) {
  if (locked) return;
  const creature = field[index];
  if (!creature) return;

  locked = true;
  const btn = slotButtons[index];
  btn.classList.add("spotting");

  const isNew = !spotted.some((s) => s.slug === creature.slug);
  const completes = isNew && spotted.length + 1 === CREATURES.length;
  const rect = btn.getBoundingClientRect();
  burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, isNew);

  addToSpotted(creature);

  if (completes) {
    celebrateAll();
  } else {
    cheerEl.textContent = isNew
      ? `New! You found ${article(creature.name)} ${creature.name}!`
      : `You spotted ${article(creature.name)} ${creature.name}!`;
    playChime(isNew ? "new" : "spot");
    cancelSpeech();
    speak(creature.name);
    speak(creature.facts[0]);
  }

  window.setTimeout(() => {
    field[index] = pickSpawn(field.map((s) => s.slug));
    fillCard(btn, field[index], index);
    locked = false;
  }, SPOT_MS);
}

/* ---------- Info card modal ---------- */

let modalEls = null;
let currentSlug = null;
let lastFocused = null;

function buildModal() {
  const overlay = document.createElement("div");
  overlay.className = "modal";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-name">
      <button class="modal-close" type="button" data-close aria-label="Close info card">&times;</button>
      <div class="modal-hero"><img class="modal-img" alt="" draggable="false" /></div>
      <div class="modal-title-row">
        <h2 class="modal-name" id="modal-name"></h2>
        <button class="say-btn modal-name-say" type="button" aria-label="Hear the name">${SPEAKER_SVG}</button>
      </div>
      <p class="modal-group"><span class="group-dot" aria-hidden="true"></span><span class="group-name"></span></p>
      <button class="modal-hear" type="button">${SPEAKER_SVG}<span>Hear everything</span></button>
      <div class="modal-section">
        <h3>All about this sea creature</h3>
        <div class="stat-grid"></div>
      </div>
      <div class="modal-section">
        <h3>Fun facts</h3>
        <ul class="fact-list"></ul>
      </div>
      <div class="modal-section">
        <h3>Real photos <span class="photo-hint">(tap to see bigger)</span></h3>
        <div class="gallery" aria-live="polite"></div>
        <p class="modal-credit">Photos from <a href="https://www.inaturalist.org" target="_blank" rel="noopener">iNaturalist</a> under Creative Commons.</p>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="lightbox-backdrop" data-lb-close></div>
    <div class="lightbox-inner">
      <button class="lightbox-close" type="button" data-lb-close aria-label="Close photo">&times;</button>
      <img class="lightbox-img" alt="" draggable="false" />
      <p class="lightbox-credit"></p>
    </div>`;
  document.body.appendChild(lightbox);

  modalEls = {
    overlay,
    card: overlay.querySelector(".modal-card"),
    close: overlay.querySelector(".modal-close"),
    img: overlay.querySelector(".modal-img"),
    name: overlay.querySelector(".modal-name"),
    nameSay: overlay.querySelector(".modal-name-say"),
    groupDot: overlay.querySelector(".modal-group .group-dot"),
    groupName: overlay.querySelector(".modal-group .group-name"),
    hear: overlay.querySelector(".modal-hear"),
    stats: overlay.querySelector(".stat-grid"),
    facts: overlay.querySelector(".fact-list"),
    gallery: overlay.querySelector(".gallery"),
    lightbox,
    lightImg: lightbox.querySelector(".lightbox-img"),
    lightCredit: lightbox.querySelector(".lightbox-credit"),
    lightClose: lightbox.querySelector(".lightbox-close"),
  };

  overlay.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) closeInfo();
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-lb-close")) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !modalEls) return;
    if (!modalEls.lightbox.hidden) closeLightbox();
    else if (!modalEls.overlay.hidden) closeInfo();
  });
}

function fillStats(creature) {
  modalEls.stats.replaceChildren();
  STAT_ROWS.forEach(([label, key]) => {
    const value = key === "sci" ? creature.sci : creature.info[key];
    if (!value) return;
    const phrase = `${label}. ${value}.`;

    const row = document.createElement("div");
    row.className = "stat-row";
    row.append(makeSayButton(`Hear ${label}`, () => speakField(phrase)));

    const text = document.createElement("div");
    text.className = "stat-text";
    const l = document.createElement("span");
    l.className = "stat-label";
    l.textContent = label;
    const v = document.createElement("span");
    v.className = "stat-value";
    v.textContent = value;
    if (key === "sci") v.classList.add("sci");
    text.append(l, v);
    row.append(text);

    row.addEventListener("click", () => speakField(phrase));
    modalEls.stats.append(row);
  });
}

function fillFacts(creature) {
  modalEls.facts.replaceChildren();
  creature.facts.forEach((fact) => {
    const li = document.createElement("li");
    li.className = "fact-item";
    li.append(makeSayButton("Hear this fact", () => speakField(fact)));
    const span = document.createElement("span");
    span.className = "fact-text";
    span.textContent = fact;
    li.append(span);
    li.addEventListener("click", () => speakField(fact));
    modalEls.facts.append(li);
  });
}

function galleryMessage(text) {
  modalEls.gallery.replaceChildren();
  const p = document.createElement("p");
  p.className = "gallery-msg";
  p.textContent = text;
  modalEls.gallery.appendChild(p);
}

// Build medium and large image URLs from an iNaturalist photo.
function photoSizes(photo) {
  const base = photo.url || photo.medium_url || "";
  const hasSquare = base.includes("/square.");
  const medium = hasSquare ? base.replace("/square.", "/medium.") : (photo.medium_url || base);
  const large = hasSquare ? base.replace("/square.", "/large.") : (photo.large_url || photo.medium_url || base);
  return { medium, large };
}

async function loadGallery(creature) {
  if (creature._photos) {
    renderGallery(creature, creature._photos);
    return;
  }
  galleryMessage("Loading real photos…");
  try {
    const res = await fetch(`https://api.inaturalist.org/v1/taxa/${creature.inat}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const taxon = data.results && data.results[0];
    const photos = (taxon && taxon.taxon_photos ? taxon.taxon_photos : [])
      .filter((p) => p.photo && OPEN_LICENSES.has(p.photo.license_code) && (p.photo.medium_url || p.photo.url))
      .slice(0, GALLERY_MAX)
      .map((p) => {
        const sizes = photoSizes(p.photo);
        return {
          url: sizes.medium,
          large: sizes.large,
          credit: (p.photo.attribution || "iNaturalist").replace(/\(c\)\s*/i, "").trim(),
        };
      });
    creature._photos = photos;
    if (currentSlug === creature.slug) renderGallery(creature, photos);
  } catch (err) {
    if (currentSlug === creature.slug) {
      galleryMessage("Couldn't load photos — check your internet connection and try again.");
    }
  }
}

function renderGallery(creature, photos) {
  modalEls.gallery.replaceChildren();
  if (!photos.length) {
    galleryMessage("No photos available for this sea creature yet.");
    return;
  }
  photos.forEach((p) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery-item";
    btn.setAttribute("aria-label", `See a bigger photo of the ${creature.name}`);
    const img = document.createElement("img");
    img.src = p.url;
    img.alt = `Photo of ${creature.name}`;
    img.loading = "lazy";
    const cap = document.createElement("span");
    cap.className = "gallery-credit";
    cap.textContent = p.credit;
    btn.append(img, cap);
    btn.addEventListener("click", () => openLightbox(p, creature));
    modalEls.gallery.appendChild(btn);
  });
}

function openLightbox(photo, creature) {
  modalEls.lightImg.src = photo.large || photo.url;
  modalEls.lightImg.alt = `Large photo of the ${creature.name}`;
  modalEls.lightCredit.textContent = photo.credit;
  modalEls.lightbox.hidden = false;
  modalEls.lightClose.focus();
}

function closeLightbox() {
  if (!modalEls || modalEls.lightbox.hidden) return;
  modalEls.lightbox.hidden = true;
  modalEls.lightImg.removeAttribute("src");
  modalEls.close.focus();
}

function openInfo(creature) {
  if (!modalEls) buildModal();
  currentSlug = creature.slug;
  lastFocused = document.activeElement;

  modalEls.img.src = artUrl(creature);
  modalEls.img.alt = `Illustration of the ${creature.name}`;
  modalEls.name.textContent = creature.name;
  modalEls.nameSay.onclick = () => speakField(creature.name);
  modalEls.groupDot.style.background = GROUPS[creature.group].color;
  modalEls.groupName.textContent = GROUPS[creature.group].name;
  modalEls.hear.onclick = () => speakAll(creature);
  fillStats(creature);
  fillFacts(creature);

  modalEls.overlay.hidden = false;
  document.body.classList.add("modal-open");
  modalEls.card.scrollTop = 0;
  modalEls.close.focus();

  loadGallery(creature);
}

function closeInfo() {
  if (!modalEls || modalEls.overlay.hidden) return;
  cancelSpeech();
  closeLightbox();
  modalEls.overlay.hidden = true;
  document.body.classList.remove("modal-open");
  currentSlug = null;
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

function renderSound() {
  soundBtn.setAttribute("aria-pressed", String(soundOn));
  soundBtn.classList.toggle("is-off", !soundOn);
  soundBtn.innerHTML = `${SPEAKER_SVG}<span class="sound-label">${soundOn ? "Sound on" : "Sound off"}</span>`;
}

function initControls() {
  renderSound();
  soundBtn.addEventListener("click", () => {
    soundOn = !soundOn;
    saveSound();
    if (soundOn) {
      playChime("spot");
    } else {
      cancelSpeech();
    }
    renderSound();
  });

  resetBtn.addEventListener("click", () => {
    if (!spotted.length) return;
    if (!window.confirm("Start over and clear your sea life logbook?")) return;
    spotted.length = 0;
    saveSpotted();
    renderSpotted();
    updateProgress();
    cheerEl.textContent = "Logbook cleared — go spot some sea life!";
  });
}

function restoreSpotted() {
  const bySlug = new Map(CREATURES.map((s) => [s.slug, s]));
  loadSpotted().forEach((slug) => {
    const creature = bySlug.get(slug);
    if (creature && !spotted.includes(creature)) spotted.push(creature);
  });
}

function start() {
  restoreSpotted();
  const exclude = [];
  for (let i = 0; i < FIELD_SIZE; i += 1) {
    const creature = pickSpawn(exclude);
    exclude.push(creature.slug);
    field.push(creature);
    const btn = makeFieldCard(i);
    slotButtons.push(btn);
    fieldEl.appendChild(btn);
  }
  initControls();
  renderSpotted();
  updateProgress();
}

start();
