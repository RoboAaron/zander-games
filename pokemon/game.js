const FIELD_SIZE = 3;
const CATCH_MS = 1000;
const SPRITE_PAD = 3;
const CAUGHT_KEY = "pokemon-caught-v1";
const HOW_TO_TEXT = "Tap a Pokémon to catch it. Tap one you caught to hear facts and see big pictures.";

const TYPES = {
  grass: { name: "Grass", bg: "#3d9b3d", text: "#fff", symbol: "grass" },
  fire: { name: "Fire", bg: "#e85d2a", text: "#fff", symbol: "fire" },
  water: { name: "Water", bg: "#3b7dd8", text: "#fff", symbol: "water" },
  electric: { name: "Electric", bg: "#f3d23b", text: "#1a1a1a", symbol: "lightning" },
  ice: { name: "Ice", bg: "#7ec8d4", text: "#1a1a1a", symbol: "water" },
  fighting: { name: "Fighting", bg: "#c45c3a", text: "#fff", symbol: "fighting" },
  ground: { name: "Ground", bg: "#d4a657", text: "#1a1a1a", symbol: "fighting" },
  rock: { name: "Rock", bg: "#b89b3e", text: "#1a1a1a", symbol: "fighting" },
  bug: { name: "Bug", bg: "#9aaa28", text: "#1a1a1a", symbol: "grass" },
  poison: { name: "Poison", bg: "#9b4d9b", text: "#fff", symbol: "grass" },
  ghost: { name: "Ghost", bg: "#6b4e96", text: "#fff", symbol: "psychic" },
  psychic: { name: "Psychic", bg: "#b56bc7", text: "#fff", symbol: "psychic" },
  dark: { name: "Dark", bg: "#2f2f3a", text: "#fff", symbol: "darkness" },
  steel: { name: "Steel", bg: "#9aa4b5", text: "#1a1a1a", symbol: "metal" },
  dragon: { name: "Dragon", bg: "#7b5ec8", text: "#fff", symbol: "dragon" },
  fairy: { name: "Fairy", bg: "#e889b0", text: "#1a1a1a", symbol: "fairy" },
  normal: { name: "Normal", bg: "#c5c0b0", text: "#1a1a1a", symbol: "colorless" },
};

const ROSTER = [
  { id: 1, name: "Bulbasaur", slug: "bulbasaur", type: "grass", say: "bul buh sore", facts: [
    "A green plant bulb sits on its back and grows along with it.",
    "It has big red eyes and four short legs.",
    "The bulb on its back likes a sunny nap.",
    "The plant grows bigger as this Pokémon grows.",
  ] },
  { id: 2, name: "Ivysaur", slug: "ivysaur", type: "grass", say: "eye vee sore", facts: [
    "The bud on its back is almost ready to bloom.",
    "A pink bud sits between the leaves on its back.",
    "Its legs are stronger, so it can carry that heavy bud.",
    "When the bud is ready, a flower is about to open.",
  ] },
  { id: 3, name: "Venusaur", slug: "venusaur", type: "grass", say: "vee nuh sore", facts: [
    "A giant flower blooms right on its back.",
    "Pink petals spread out like a big umbrella.",
    "The flower gets brighter after a sunny day.",
    "This is the biggest form of the little bulb Pokémon.",
  ] },
  { id: 4, name: "Charmander", slug: "charmander", type: "fire", say: "char man der", facts: [
    "A little flame always burns on the tip of its tail.",
    "Its belly is cream colored and its feet are small.",
    "The tail flame burns the whole time it is awake.",
    "If the flame is strong, Charmander feels strong too.",
  ] },
  { id: 5, name: "Charmeleon", slug: "charmeleon", type: "fire", say: "char, mee lee un", facts: [
    "The flame on its tail burns brighter as it grows.",
    "It is redder and has sharper claws than Charmander.",
    "It swishes a fiery tail when it feels fierce.",
    "The flame grows larger as this lizard grows.",
  ] },
  { id: 6, name: "Charizard", slug: "charizard", type: "fire", say: "char ih zard", facts: [
    "This orange dragon can breathe a huge stream of fire.",
    "Wide wings and a cream belly make it look huge.",
    "It can fly and blast fire from its mouth.",
    "The flame on its tail keeps burning while it soars.",
  ] },
  { id: 7, name: "Squirtle", slug: "squirtle", type: "water", say: "skwir tul", facts: [
    "It ducks into its shell and squirts water out.",
    "A brown shell covers its blue body.",
    "It pulls its head and legs inside when it hides.",
    "Water shoots from its mouth in a strong squirt.",
  ] },
  { id: 8, name: "Wartortle", slug: "wartortle", type: "water", say: "war, tore tul", facts: [
    "Fluffy ears and a fluffy tail help it zip through the water.",
    "Dark blue fur and a thick tail help it swim.",
    "The fluffy ears stand up like little wings.",
    "It is the middle step before the cannon turtle.",
  ] },
  { id: 9, name: "Blastoise", slug: "blastoise", type: "water", say: "blas toys", facts: [
    "Two water cannons stick out of the shell on its back.",
    "The shell is heavy, with a cannon on each side.",
    "It can blast water far across a pool.",
    "Those cannons grew where the shell used to be plain.",
  ] },
  { id: 10, name: "Caterpie", slug: "caterpie", type: "bug", say: "cat ur pee", facts: [
    "Tiny feet let this little bug climb straight up.",
    "A green body, yellow rings, and a red feeler.",
    "The little feet stick to almost any wall.",
    "This is the caterpillar that becomes a butterfly.",
  ] },
  { id: 11, name: "Metapod", slug: "metapod", type: "bug", say: "met uh pod", facts: [
    "It stays very still inside a hard green shell.",
    "Only its eyes show on the hard green shell.",
    "It waits quietly while its body changes inside.",
    "The shell is tough so it can stay safe.",
  ] },
  { id: 12, name: "Butterfree", slug: "butterfree", type: "bug", say: "but er free", facts: [
    "Pretty wings carry this bug from flower to flower.",
    "Big eyes and white wings with black marks.",
    "Powder shakes off the wings when it flaps.",
    "It flies from flower to flower to drink.",
  ] },
  { id: 13, name: "Weedle", slug: "weedle", type: "bug", say: "wee dull", facts: [
    "A little sting sits right on top of its head.",
    "A brown bug with a pink nose and a small sting.",
    "The sting on its head is sharp, so it is careful.",
    "This little bug will hang still and change.",
  ] },
  { id: 14, name: "Kakuna", slug: "kakuna", type: "bug", say: "kah, koo na", facts: [
    "It hangs quiet and still while its body changes.",
    "A yellow shell with two eyes peeking out.",
    "It hangs from a branch and barely moves.",
    "Inside the shell, its body is changing.",
  ] },
  { id: 15, name: "Beedrill", slug: "beedrill", type: "bug", say: "bee dril", facts: [
    "Sharp stingers poke out from its arms and its tail.",
    "Yellow and black, with stripes and fast wings.",
    "Three stingers help it guard its home.",
    "It can zip through the air very quickly.",
  ] },
  { id: 16, name: "Pidgey", slug: "pidgey", type: "normal", say: "pidge ee", facts: [
    "This small bird flaps hard just above the grass.",
    "A small brown bird with a short beak.",
    "It flaps low over the grass to look for food.",
    "Its wings are small, but they work hard.",
  ] },
  { id: 17, name: "Pidgeotto", slug: "pidgeotto", type: "normal", say: "pidge ee, oh toe", facts: [
    "Bigger wings help this bird fly much farther.",
    "A crest of feathers sticks up on its head.",
    "Sharper claws and bigger wings make it braver.",
    "It can fly much farther than the little bird.",
  ] },
  { id: 18, name: "Pidgeot", slug: "pidgeot", type: "normal", say: "pidge ee ot", facts: [
    "It flies so fast the wind roars past its wings.",
    "A tall crest and very wide wings.",
    "It is one of the fastest birds in the sky.",
    "The wind roars when those big wings beat.",
  ] },
  { id: 19, name: "Rattata", slug: "rattata", type: "normal", say: "ra, tat ta", facts: [
    "Big front teeth help this little mouse nibble.",
    "Purple fur, big ears, and long front teeth.",
    "It nibbles and scurries close to the ground.",
    "Those teeth keep growing, so it gnaws a lot.",
  ] },
  { id: 20, name: "Raticate", slug: "raticate", type: "normal", say: "rat ih kate", facts: [
    "Long whiskers and sharp teeth make this mouse tough.",
    "Brown fur and very long whiskers.",
    "The big fangs make this mouse look tough.",
    "It is the grown-up form of the little purple mouse.",
  ] },
  { id: 21, name: "Spearow", slug: "spearow", type: "normal", say: "speer oh", facts: [
    "It flaps tiny wings and pecks with a pointy beak.",
    "A tiny bird with a sharp little beak.",
    "It flaps fast and pecks at anything close.",
    "Even small wings can carry a fierce bird.",
  ] },
  { id: 22, name: "Fearow", slug: "fearow", type: "normal", say: "feer oh", facts: [
    "A long neck lets this big bird peck far away.",
    "A long neck and a long, pointy beak.",
    "Huge wings let it swoop from far away.",
    "It can peck something without getting close.",
  ] },
  { id: 23, name: "Ekans", slug: "ekans", type: "poison", say: "ek kins", facts: [
    "This purple snake shakes its tail when it is upset.",
    "A purple snake with a yellow belly.",
    "It rattles the tip of its tail when it is mad.",
    "Its name sounds like snake spelled backward.",
  ] },
  { id: 24, name: "Arbok", slug: "arbok", type: "poison", say: "are bock", facts: [
    "A fierce face pattern spreads across its big hood.",
    "A wide hood opens on its neck.",
    "The pattern on the hood looks like a scary face.",
    "It coils up tall before it strikes.",
  ] },
  { id: 25, name: "Pikachu", slug: "pikachu", type: "electric", say: "pee kuh choo", facts: [
    "The red circles on its cheeks can spark.",
    "Yellow fur, long ears, and brown back stripes.",
    "The cheeks spark when it is excited or mad.",
    "Its tail is shaped a bit like a lightning bolt.",
  ] },
  { id: 26, name: "Raichu", slug: "raichu", type: "electric", say: "rye choo", facts: [
    "A long tail can slam down an even bigger spark.",
    "Orange fur, a white belly, and a long thin tail.",
    "It slams that tail down to let out a big spark.",
    "It is the grown-up form of the little spark mouse.",
  ] },
  { id: 27, name: "Sandshrew", slug: "sandshrew", type: "ground", say: "sand shrew", facts: [
    "It curls into a spiky ball to hide in the sand.",
    "A yellow body with a brick-like pattern.",
    "It rolls into a ball so the spikes face out.",
    "Dry sand is where it likes to hide.",
  ] },
  { id: 28, name: "Sandslash", slug: "sandslash", type: "ground", say: "sand slash", facts: [
    "Sharp quills cover its back like a walking cactus.",
    "Long quills and big claws cover this digger.",
    "It can roll forward like a spiky wheel.",
    "The quills are harder than the little one's spikes.",
  ] },
  { id: 29, name: "Nidoran♀", slug: "nidoranf", type: "poison", say: "nee doh ran female", facts: [
    "Tiny ears and a little horn mark this one as the girl.",
    "Small ears, blue-purple fur, and one little horn.",
    "The horn is poisonous, so a poke can sting.",
    "This is the girl, and she is smaller than the boy.",
  ] },
  { id: 30, name: "Nidorina", slug: "nidorina", type: "poison", say: "nee doh, ree na", facts: [
    "It is gentle, and a short horn grows on its head.",
    "Blue fur and a short horn on its forehead.",
    "It is calmer and does not pick fights.",
    "The horn is still small, but it is tough.",
  ] },
  { id: 31, name: "Nidoqueen", slug: "nidoqueen", type: "poison", say: "nee doh queen", facts: [
    "A strong horn and thick hide protect this big queen.",
    "A big body, thick skin, and one strong horn.",
    "It stands in front of its family to guard them.",
    "The thick hide is hard to scratch.",
  ] },
  { id: 32, name: "Nidoran♂", slug: "nidoranm", type: "poison", say: "nee doh ran male", facts: [
    "Bigger ears and a brave little horn mark this one as the boy.",
    "Bigger ears, purple fur, and a pointed horn.",
    "It shows the horn when it wants to look brave.",
    "This is the boy, with ears larger than the girl's.",
  ] },
  { id: 33, name: "Nidorino", slug: "nidorino", type: "poison", say: "nee doh, ree no", facts: [
    "The horn on its head gets harder as it grows.",
    "A longer horn and angry eyebrows.",
    "It charges with that horn when it is upset.",
    "The horn gets harder each time it grows.",
  ] },
  { id: 34, name: "Nidoking", slug: "nidoking", type: "poison", say: "nee doh king", facts: [
    "A huge horn and a thick tail make it very tough.",
    "A huge horn, a thick tail, and a strong body.",
    "It can smash rocks by swinging that tail.",
    "This is the king of the horn family.",
  ] },
  { id: 35, name: "Clefairy", slug: "clefairy", type: "fairy", say: "cluh, fair ee", facts: [
    "Tiny wings on its back are too small for real flying.",
    "A pink body, tiny wings, and pointed fingers.",
    "It dances more than it flies.",
    "Those wings are too small to lift it for long.",
  ] },
  { id: 36, name: "Clefable", slug: "clefable", type: "fairy", say: "cluh, fay bull", facts: [
    "It listens closely, then bounces off on little wings.",
    "Curly ears and small wings on a pink body.",
    "It bounces away when it wants to be left alone.",
    "It can hear tiny sounds very well.",
  ] },
  { id: 37, name: "Vulpix", slug: "vulpix", type: "fire", say: "vul picks", facts: [
    "Six fluffy tails curl behind this little fox.",
    "An orange fox with six curly tails.",
    "The tails fluff up when it feels hot.",
    "Six tails now, and more grow in later.",
  ] },
  { id: 38, name: "Ninetales", slug: "ninetales", type: "fire", say: "nine tails", facts: [
    "Nine long tails fan out around this elegant fox.",
    "A cream fox with nine long tails.",
    "The tails fan out like a golden cape.",
    "It is said to live a very long time.",
  ] },
  { id: 39, name: "Jigglypuff", slug: "jigglypuff", type: "normal", say: "jig lee puff", facts: [
    "This round singer can puff up big like a balloon.",
    "A round pink body and huge green eyes.",
    "It sings into a little microphone it holds.",
    "It can puff up big, then slowly shrink again.",
  ] },
  { id: 40, name: "Wigglytuff", slug: "wigglytuff", type: "normal", say: "wig lee tuff", facts: [
    "Huge eyes shine on a very round, very soft body.",
    "A very round body and long rabbit-like ears.",
    "The big eyes shine when it is happy.",
    "Its body is so soft it can bounce.",
  ] },
  { id: 41, name: "Zubat", slug: "zubat", type: "poison", say: "zoo bat", facts: [
    "It hangs in dark caves and listens with big ears.",
    "A blue body, big ears, and no eyes.",
    "It hangs upside down in dark caves.",
    "It listens, because it cannot see.",
  ] },
  { id: 42, name: "Golbat", slug: "golbat", type: "poison", say: "goal bat", facts: [
    "Wide wings and four fangs help it fly at night.",
    "Huge fangs and wide purple wings.",
    "It flies at night to look for food.",
    "Four fangs show when its mouth opens.",
  ] },
  { id: 43, name: "Oddish", slug: "oddish", type: "grass", say: "odd ish", facts: [
    "Green leaves sprout from the top of its head.",
    "A blue body with green leaves on its head.",
    "It plants its feet and naps in the day.",
    "At night it walks around on those leaves.",
  ] },
  { id: 44, name: "Gloom", slug: "gloom", type: "grass", say: "gloom", facts: [
    "A droopy flower on its head has a very strong smell.",
    "A droopy red-and-blue flower on its head.",
    "The smell from that flower is very strong.",
    "It droops more when it feels gloomy.",
  ] },
  { id: 45, name: "Vileplume", slug: "vileplume", type: "grass", say: "vile plume", facts: [
    "A huge red flower blooms right on top of its head.",
    "A huge red flower covers most of its head.",
    "It walks on two legs under that big bloom.",
    "The flower is the largest in this plant family.",
  ] },
  { id: 46, name: "Paras", slug: "paras", type: "bug", say: "pair us", facts: [
    "Two little mushrooms grow on this bug's back.",
    "An orange bug with two mushrooms on its back.",
    "The mushrooms and the bug help each other.",
    "It stays low in damp, shady places.",
  ] },
  { id: 47, name: "Parasect", slug: "parasect", type: "bug", say: "para sekt", facts: [
    "A giant mushroom sits where this bug's back should be.",
    "A giant mushroom covers almost its whole back.",
    "The mushroom is so big the bug looks small.",
    "It still has little claws under that cap.",
  ] },
  { id: 48, name: "Venonat", slug: "venonat", type: "bug", say: "veh no nat", facts: [
    "Big round eyes glow in the dark like tiny lamps.",
    "A fuzzy purple body and huge round eyes.",
    "The eyes glow like lamps in the dark.",
    "Fine hair covers it from head to foot.",
  ] },
  { id: 49, name: "Venomoth", slug: "venomoth", type: "bug", say: "veh no moth", facts: [
    "Its dusty wings can shake out an itchy powder.",
    "Light wings with a dusty look.",
    "It flaps and shakes itchy powder into the air.",
    "Those big eyes still glow at night.",
  ] },
  { id: 50, name: "Diglett", slug: "diglett", type: "ground", say: "dig let", facts: [
    "Only its head pops up out of a hole in the dirt.",
    "A brown head, a pink nose, and no visible body.",
    "It pops out of the dirt, then ducks back down.",
    "The rest of it stays hidden in the hole.",
  ] },
  { id: 51, name: "Dugtrio", slug: "dugtrio", type: "ground", say: "dug, tree oh", facts: [
    "Three heads pop out of one hole in the ground.",
    "Three heads share one hole in the ground.",
    "Each head can look a different way.",
    "They dig together as a team.",
  ] },
  { id: 52, name: "Meowth", slug: "meowth", type: "normal", say: "mee, owth", facts: [
    "This cat walks on two feet and loves shiny coins.",
    "Cream fur, whiskers, and a coin on its forehead.",
    "It walks on two feet like a little person.",
    "It likes round, shiny coins.",
  ] },
  { id: 53, name: "Persian", slug: "persian", type: "normal", say: "per zhun", facts: [
    "A red jewel shines in the middle of its forehead.",
    "A sleek cream body and a red jewel on its head.",
    "Long whiskers fan out from its cheeks.",
    "It walks proudly with its head high.",
  ] },
  { id: 54, name: "Psyduck", slug: "psyduck", type: "water", say: "sigh duck", facts: [
    "It holds its head when a headache makes it dizzy.",
    "A yellow duck with a blank, worried face.",
    "It grabs its head when the headache starts.",
    "Empty eyes mean it is feeling dizzy.",
  ] },
  { id: 55, name: "Golduck", slug: "golduck", type: "water", say: "goal duck", facts: [
    "A red gem on its forehead glows while it swims.",
    "A blue duck with webbed hands and a red gem.",
    "The gem glows while it swims fast.",
    "It is much quicker in the water than it looks.",
  ] },
  { id: 56, name: "Mankey", slug: "mankey", type: "fighting", say: "man key", facts: [
    "This monkey gets grumpy and swings a long tail.",
    "A pig-like nose and a long curling tail.",
    "It gets grumpy fast and jumps around.",
    "The tail helps it balance while it swings.",
  ] },
  { id: 57, name: "Primeape", slug: "primeape", type: "fighting", say: "prime ape", facts: [
    "It stomps the ground and shows a pig-like snout.",
    "A pig snout and bands around its arms.",
    "It stomps and pants when it is angry.",
    "It stays mad longer than the little monkey.",
  ] },
  { id: 58, name: "Growlithe", slug: "growlithe", type: "fire", say: "growl ith", facts: [
    "Stripes and a fluffy mane make this puppy look brave.",
    "Orange fur, black stripes, and a fluffy mane.",
    "It barks and guards the friends it trusts.",
    "The stripes make this puppy look like a tiny tiger.",
  ] },
  { id: 59, name: "Arcanine", slug: "arcanine", type: "fire", say: "are kuh nine", facts: [
    "A big mane and fast legs make this dog look proud.",
    "A huge mane, stripes, and very fast legs.",
    "It can race so quickly the ground shakes.",
    "This proud dog grew up from the striped puppy.",
  ] },
  { id: 60, name: "Poliwag", slug: "poliwag", type: "water", say: "paul lee wag", facts: [
    "A swirl on its round belly shows through its skin.",
    "A round tadpole body with a black-and-white swirl.",
    "The swirl on its belly shows through the skin.",
    "Its tail helps it wiggle through the water.",
  ] },
  { id: 61, name: "Poliwhirl", slug: "poliwhirl", type: "water", say: "paul lee whirl", facts: [
    "It stands up, and the swirl on its belly keeps spinning.",
    "White gloves and a swirl on a blue belly.",
    "It can live in the water or hop on land.",
    "The swirl keeps spinning as it grows.",
  ] },
  { id: 62, name: "Poliwrath", slug: "poliwrath", type: "water", say: "paul lee rath", facts: [
    "Strong arms spin along with the swirl on its belly.",
    "Big muscles and fists, plus the same belly swirl.",
    "It spins its arms when it swims hard.",
    "The swirl never leaves, even when it gets strong.",
  ] },
  { id: 63, name: "Abra", slug: "abra", type: "psychic", say: "ab ra", facts: [
    "It sleeps almost all day, then pops somewhere else.",
    "A yellow body and eyes that stay shut.",
    "It naps all day, then pops to a new spot.",
    "It would rather sleep than walk.",
  ] },
  { id: 64, name: "Kadabra", slug: "kadabra", type: "psychic", say: "kuh, dab ra", facts: [
    "A spoon floats beside it while it thinks very hard.",
    "A mustache, a star on its head, and a spoon.",
    "The spoon floats while it thinks.",
    "It stands on two legs and stares hard.",
  ] },
  { id: 65, name: "Alakazam", slug: "alakazam", type: "psychic", say: "al uh kuh, zam", facts: [
    "It holds a spoon in each hand and thinks super fast.",
    "A thin body, a mustache, and a spoon in each hand.",
    "Both spoons can float while it concentrates.",
    "It thinks faster than almost any other Pokémon.",
  ] },
  { id: 66, name: "Machop", slug: "machop", type: "fighting", say: "muh, chop", facts: [
    "This little fighter practices punches every day.",
    "A small gray body with ridges on its head.",
    "It lifts and punches to practice every day.",
    "Even little muscles get stronger with work.",
  ] },
  { id: 67, name: "Machoke", slug: "machoke", type: "fighting", say: "muh, choke", facts: [
    "A belt around its waist helps it lift heavy things.",
    "A blue-gray body and a belt at its waist.",
    "The belt helps it lift very heavy things.",
    "It is the middle step of the punching family.",
  ] },
  { id: 68, name: "Machamp", slug: "machamp", type: "fighting", say: "muh, champ", facts: [
    "Four strong arms can throw a whole bunch of punches.",
    "Four arms and a champion belt.",
    "It can throw punches from every side at once.",
    "Four arms means it never needs to turn around to hit.",
  ] },
  { id: 69, name: "Bellsprout", slug: "bellsprout", type: "grass", say: "bell sprout", facts: [
    "Its thin green body bends like a little plant bell.",
    "A yellow bell body with roots for feet.",
    "It bends and sways like a plant in the wind.",
    "The leaves on its head look like a bud.",
  ] },
  { id: 70, name: "Weepinbell", slug: "weepinbell", type: "grass", say: "wee pin bell", facts: [
    "Two leafy bells hang down where its mouth should be.",
    "A green leafy bell with two dangling parts.",
    "It hangs and waits, then snaps at food.",
    "The leaves hide a mouth underneath.",
  ] },
  { id: 71, name: "Victreebel", slug: "victreebel", type: "grass", say: "vick tree bell", facts: [
    "A big leafy mouth can snap shut like a plant trap.",
    "A tall plant with a huge open mouth.",
    "A long vine can pull food toward that mouth.",
    "The mouth snaps shut like a trap.",
  ] },
  { id: 72, name: "Tentacool", slug: "tentacool", type: "water", say: "ten ta cool", facts: [
    "Two shiny eyes glow on this floating water blob.",
    "A blue blob with two red gems for eyes.",
    "It floats in the sea and trails two arms.",
    "The gems glow under the water.",
  ] },
  { id: 73, name: "Tentacruel", slug: "tentacruel", type: "water", say: "ten ta cruel", facts: [
    "Lots of long arms trail under its red body.",
    "A red body with many long blue arms.",
    "The arms can sting as they drift.",
    "It has far more arms than the little blob.",
  ] },
  { id: 74, name: "Geodude", slug: "geodude", type: "rock", say: "gee oh dude", facts: [
    "This round rock has arms and a grumpy stony face.",
    "A round rock with arms and a rocky face.",
    "It looks grumpy even when it is still.",
    "The arms are made of the same stone as its body.",
  ] },
  { id: 75, name: "Graveler", slug: "graveler", type: "rock", say: "grav el ler", facts: [
    "Four rocky arms help it roll down a hill.",
    "Four rocky arms and a lumpy stone body.",
    "It rolls down hills when it wants to move fast.",
    "Extra arms help it climb as well as roll.",
  ] },
  { id: 76, name: "Golem", slug: "golem", type: "rock", say: "go lum", facts: [
    "A heavy rocky shell covers almost its whole body.",
    "A huge round shell of rock.",
    "It can pull its head and arms inside.",
    "The shell is so heavy it shakes the ground.",
  ] },
  { id: 77, name: "Ponyta", slug: "ponyta", type: "fire", say: "poh nee tah", facts: [
    "Little flames flicker in this horse's mane.",
    "A small horse with flames in its mane and tail.",
    "The fire does not burn its own hair.",
    "Its hooves can leave warm prints behind.",
  ] },
  { id: 78, name: "Rapidash", slug: "rapidash", type: "fire", say: "rapid dash", facts: [
    "A fiery mane streams back when it gallops.",
    "A horn and a mane made of streaming fire.",
    "It gallops so fast it is hard to follow.",
    "The fiery mane stretches out in the wind.",
  ] },
  { id: 79, name: "Slowpoke", slug: "slowpoke", type: "water", say: "slow poke", facts: [
    "It stares into space and takes a long time to notice you.",
    "A pink body, a dopey smile, and a long tail.",
    "It stares at the water and forgets what it was doing.",
    "It is happy to sit still for a long time.",
  ] },
  { id: 80, name: "Slowbro", slug: "slowbro", type: "water", say: "slow bro", facts: [
    "A shell clamps onto its tail and will not let go.",
    "A pink body with a shell clamped on its tail.",
    "The shell bites down and will not let go.",
    "It fishes with that tail still attached.",
  ] },
  { id: 81, name: "Magnemite", slug: "magnemite", type: "electric", say: "mag nuh mite", facts: [
    "Screws on its sides pull it toward anything metal.",
    "A metal eye with a screw on each side.",
    "It floats and sticks to magnets and metal.",
    "The screws spin when it is pulling hard.",
  ] },
  { id: 82, name: "Magneton", slug: "magneton", type: "electric", say: "mag nuh ton", facts: [
    "Three magnets snap together into one buzzing body.",
    "Three round magnets locked into one body.",
    "It floats and buzzes with electricity.",
    "Each piece still has its own eye.",
  ] },
  { id: 83, name: "Farfetch’d", slug: "farfetchd", type: "normal", say: "far fetched", facts: [
    "It carries a long green onion like a little sword.",
    "A brown duck holding a long green onion.",
    "It carries that onion everywhere like a sword.",
    "It will not let go of its favorite stalk.",
  ] },
  { id: 84, name: "Doduo", slug: "doduo", type: "normal", say: "doe, doo oh", facts: [
    "Two heads share one speedy bird body.",
    "Two heads on one tall, skinny bird.",
    "Both heads can peck while the legs run.",
    "It is fast even with two necks to balance.",
  ] },
  { id: 85, name: "Dodrio", slug: "dodrio", type: "normal", say: "doe, dree oh", facts: [
    "Three heads can look three different ways at once.",
    "Three heads on one set of long legs.",
    "Each head can watch a different direction.",
    "Three beaks can peck one after another.",
  ] },
  { id: 86, name: "Seel", slug: "seel", type: "water", say: "seal", facts: [
    "This white sea pup has a little horn on its head.",
    "A white body, flippers, and a little horn.",
    "It slides across ice and swims in cold water.",
    "The horn is small now and grows later.",
  ] },
  { id: 87, name: "Dewgong", slug: "dewgong", type: "water", say: "doo gong", facts: [
    "A long white body glides through icy water.",
    "A long white body with a horn on its head.",
    "It glides under the ice without a splash.",
    "It is the grown-up form of the little sea pup.",
  ] },
  { id: 88, name: "Grimer", slug: "grimer", type: "poison", say: "grime ur", facts: [
    "This purple blob oozes slowly along the ground.",
    "A purple sludge body with two arms.",
    "It oozes along and leaves a sticky trail.",
    "The sludge can squeeze through small gaps.",
  ] },
  { id: 89, name: "Muk", slug: "muk", type: "poison", say: "muck", facts: [
    "A bigger gooey blob leaves a sticky trail behind it.",
    "A bigger purple sludge with a wide mouth.",
    "It slumps forward and leaves a stinky path.",
    "Anything it touches can get sticky.",
  ] },
  { id: 90, name: "Shellder", slug: "shellder", type: "water", say: "shell der", facts: [
    "Its two shells can clamp shut just like a clam.",
    "Two shells and a tongue poking out.",
    "It clamps shut like a clam when it is scared.",
    "A pearl can hide inside the shell.",
  ] },
  { id: 91, name: "Cloyster", slug: "cloyster", type: "water", say: "cloy ster", facts: [
    "A spiky shell stays shut tight until it wants to bite.",
    "A round shell covered in sharp spikes.",
    "It stays shut until it wants to bite.",
    "The spikes make it hard to pick up.",
  ] },
  { id: 92, name: "Gastly", slug: "gastly", type: "ghost", say: "gast lee", facts: [
    "A spooky face peeks out of a purple cloud of gas.",
    "A purple cloud with a spooky face inside.",
    "It floats and can slip through a wall.",
    "The gas is the whole Pokémon.",
  ] },
  { id: 93, name: "Haunter", slug: "haunter", type: "ghost", say: "haunt ur", facts: [
    "It floats along with a big grin and ghostly hands.",
    "A gas body, a big grin, and floating hands.",
    "It reaches out with hands that are not solid.",
    "The tongue sticks out when it is teasing.",
  ] },
  { id: 94, name: "Gengar", slug: "gengar", type: "ghost", say: "geng gar", facts: [
    "A wide spooky smile glows when the lights go out.",
    "A round shadow with spikes on its back.",
    "Its wide smile shows up in the dark.",
    "It hides, then pops out to surprise someone.",
  ] },
  { id: 95, name: "Onix", slug: "onix", type: "rock", say: "on icks", facts: [
    "This long rock snake digs deep tunnels underground.",
    "A long body made of round gray boulders.",
    "A horn sticks out from its rocky head.",
    "It digs tunnels by pushing through the ground.",
  ] },
  { id: 96, name: "Drowzee", slug: "drowzee", type: "psychic", say: "drow zee", facts: [
    "Its long nose swings while it daydreams.",
    "A yellow body and a long tapir nose.",
    "The nose swings while it dreams.",
    "It likes naps as much as it likes tricks.",
  ] },
  { id: 97, name: "Hypno", slug: "hypno", type: "psychic", say: "hip no", facts: [
    "A swinging pendulum makes sleepy eyes even sleepier.",
    "A pendulum swings from one hand.",
    "Its eyes look heavy and sleepy.",
    "The swinging charm makes others drowsy.",
  ] },
  { id: 98, name: "Krabby", slug: "krabby", type: "water", say: "krab ee", facts: [
    "One claw is much bigger and pinches much harder.",
    "A small crab with one claw much bigger.",
    "The big claw pinches harder than the little one.",
    "It walks sideways on the beach.",
  ] },
  { id: 99, name: "Kingler", slug: "kingler", type: "water", say: "king ler", facts: [
    "A giant claw can pinch something as big as a coconut.",
    "One claw is giant and the other is small.",
    "The big claw is strong enough to crack a coconut.",
    "It is proud of that oversized pinch.",
  ] },
  { id: 100, name: "Voltorb", slug: "voltorb", type: "electric", say: "volt orb", facts: [
    "It looks like a round toy ball that can suddenly zap.",
    "A red-and-white ball with a face.",
    "It looks like a toy, then suddenly zaps.",
    "It rolls instead of walking.",
  ] },
  { id: 101, name: "Electrode", slug: "electrode", type: "electric", say: "ee, leck trode", facts: [
    "This ball rolls around, then pops with electricity.",
    "A ball with the colors flipped from the little one.",
    "It rolls fast, then pops with electricity.",
    "The face is upside down compared with Voltorb.",
  ] },
  { id: 102, name: "Exeggcute", slug: "exeggcute", type: "grass", say: "ex egg cute", facts: [
    "Six little eggs huddle together in a bunch.",
    "Six pink eggs huddled in a bunch.",
    "Each egg has its own little face.",
    "They have to stay together to get around.",
  ] },
  { id: 103, name: "Exeggutor", slug: "exeggutor", type: "grass", say: "ex, egg uh tore", facts: [
    "Three coconut heads grow on one tall body.",
    "Three coconut heads on a tall brown body.",
    "Each head can look around on its own.",
    "It stands like a palm tree that can walk.",
  ] },
  { id: 104, name: "Cubone", slug: "cubone", type: "ground", say: "cue bone", facts: [
    "It wears a little bone helmet wherever it goes.",
    "A little cub wearing a bone as a helmet.",
    "It carries a bone club wherever it goes.",
    "The helmet hides its eyes.",
  ] },
  { id: 105, name: "Marowak", slug: "marowak", type: "ground", say: "mare oh wack", facts: [
    "It swings a long bone like a club.",
    "A bigger cub with a skull helmet and a bone club.",
    "It swings the bone when it wants space.",
    "The helmet is the same kind Cubone wears.",
  ] },
  { id: 106, name: "Hitmonlee", slug: "hitmonlee", type: "fighting", say: "hit mon, lee", facts: [
    "Springy legs can kick higher than its own head.",
    "Long springy legs and feet made for kicking.",
    "It can kick higher than its own head.",
    "The legs stretch out like rubber.",
  ] },
  { id: 107, name: "Hitmonchan", slug: "hitmonchan", type: "fighting", say: "hit mon, chan", facts: [
    "Fast fists punch like a tiny boxer.",
    "Red boxing gloves and a fighter's stance.",
    "Fast fists punch one after another.",
    "It hops like a tiny boxer.",
  ] },
  { id: 108, name: "Lickitung", slug: "lickitung", type: "normal", say: "lick it tung", facts: [
    "A huge tongue can stretch way, way out.",
    "A pink body and a tongue longer than its arms.",
    "The tongue can stretch way out to grab a snack.",
    "It rolls its tongue up when it is done.",
  ] },
  { id: 109, name: "Koffing", slug: "koffing", type: "poison", say: "koff ing", facts: [
    "This round gas ball floats and puffs smelly air.",
    "A round purple body full of smelly gas.",
    "Skull marks show on its sides.",
    "It floats and puffs when it is bumped.",
  ] },
  { id: 110, name: "Weezing", slug: "weezing", type: "poison", say: "weez ing", facts: [
    "Three smoky heads leak stinky puffs at once.",
    "Two big smoky heads stuck together.",
    "A smaller puff sits on the side.",
    "Both heads can leak stinky gas at once.",
  ] },
  { id: 111, name: "Rhyhorn", slug: "rhyhorn", type: "ground", say: "rye horn", facts: [
    "A tough horn and rocky hide help it charge ahead.",
    "A gray body, rocky hide, and a drill horn.",
    "It charges straight ahead and is hard to stop.",
    "The hide feels like stone.",
  ] },
  { id: 112, name: "Rhydon", slug: "rhydon", type: "ground", say: "rye don", facts: [
    "A bigger horn can drill right through rock.",
    "It stands up, with a bigger horn and a thick tail.",
    "The horn can drill into rock.",
    "Its arms are strong enough to lift boulders.",
  ] },
  { id: 113, name: "Chansey", slug: "chansey", type: "normal", say: "chan see", facts: [
    "A tiny egg rides safe in the pouch on its tummy.",
    "A pink oval body with a pouch in front.",
    "A tiny egg rides safe in that pouch.",
    "It shares eggs when it wants to be kind.",
  ] },
  { id: 114, name: "Tangela", slug: "tangela", type: "grass", say: "tang guh luh", facts: [
    "Blue vines cover it like a wiggly mop.",
    "Blue vines cover its whole body like a mop.",
    "Red shoes peek out under the vines.",
    "The vines wiggle even when it stands still.",
  ] },
  { id: 115, name: "Kangaskhan", slug: "kangaskhan", type: "normal", say: "kang gas khan", facts: [
    "A baby peeks out of the pouch on its tummy.",
    "A big parent with a baby in a tummy pouch.",
    "The baby peeks out and rides along.",
    "It guards that baby with its whole body.",
  ] },
  { id: 116, name: "Horsea", slug: "horsea", type: "water", say: "horse, see", facts: [
    "A curly tail pushes this little water dragon along.",
    "A tiny blue water dragon with a curly tail.",
    "It squirts ink when it wants to hide.",
    "The curled tail pushes it through the water.",
  ] },
  { id: 117, name: "Seadra", slug: "seadra", type: "water", say: "see druh", facts: [
    "Spiny fins and a long snout make it a fierce swimmer.",
    "Spiny fins and a long snout.",
    "It swims backward as well as forward.",
    "The spines make it prickly to grab.",
  ] },
  { id: 118, name: "Goldeen", slug: "goldeen", type: "water", say: "goal dean", facts: [
    "A horn on its head gleams like gold underwater.",
    "A gold horn and long flowing fins.",
    "It flutters those fins like a dress.",
    "The horn gleams under the water.",
  ] },
  { id: 119, name: "Seaking", slug: "seaking", type: "water", say: "see king", facts: [
    "A sharp horn and a strong tail power this fish.",
    "A bigger horn and a strong forked tail.",
    "It swims hard when it is guarding eggs.",
    "The horn is sharper than the little fish's horn.",
  ] },
  { id: 120, name: "Staryu", slug: "staryu", type: "water", say: "star you", facts: [
    "A red gem glows in the middle of this sea star.",
    "Five arms and a red gem in the center.",
    "It spins through the water like a star.",
    "The gem glows at night.",
  ] },
  { id: 121, name: "Starmie", slug: "starmie", type: "water", say: "star mee", facts: [
    "The gem in its center can sparkle many colors.",
    "Two stars, one on each side, and a bright core.",
    "The center gem can shine many colors.",
    "It spins even faster than the little star.",
  ] },
  { id: 122, name: "Mr. Mime", slug: "mrmime", type: "psychic", say: "mister, mime", facts: [
    "It can push the air and make an invisible wall.",
    "A white face, green hair, and pink cheeks.",
    "It mimes a wall you cannot see.",
    "Its fingers are always spread like a show.",
  ] },
  { id: 123, name: "Scyther", slug: "scyther", type: "bug", say: "sigh ther", facts: [
    "Sharp arm blades slice the air when it leaps.",
    "A green body and blades for arms.",
    "It leaps and slices the air with those blades.",
    "Wings on its back make the jump longer.",
  ] },
  { id: 124, name: "Jynx", slug: "jynx", type: "ice", say: "jinx", facts: [
    "It dances on the ice and sings a chilly song.",
    "Purple skin, blonde hair, and a red dress.",
    "It dances and sings a chilly song.",
    "The dress looks like it is made of ice.",
  ] },
  { id: 125, name: "Electabuzz", slug: "electabuzz", type: "electric", say: "eh, leck ta buzz", facts: [
    "Sparks jump between the two antennae on its head.",
    "Yellow fur, black stripes, and two antennae.",
    "Sparks jump between the antennae.",
    "Its tail ends in a little lightning shape.",
  ] },
  { id: 126, name: "Magmar", slug: "magmar", type: "fire", say: "mag mar", facts: [
    "Flames puff from its mouth and from its hands.",
    "A duck-like bill and flames at its mouth.",
    "Fire puffs from its hands too.",
    "The belly is marked like a flame.",
  ] },
  { id: 127, name: "Pinsir", slug: "pinsir", type: "bug", say: "pin sir", facts: [
    "Huge horns can pick up something as heavy as a log.",
    "Huge horns on a brown beetle body.",
    "It can pick up a log with those horns.",
    "The horns open and snap shut.",
  ] },
  { id: 128, name: "Tauros", slug: "tauros", type: "normal", say: "tore ross", facts: [
    "Three tails whip while it charges on strong hooves.",
    "Three tails and a hump on a big bull.",
    "It charges on strong hooves.",
    "The three tails whip when it runs.",
  ] },
  { id: 129, name: "Magikarp", slug: "magikarp", type: "water", say: "madge eh carp", facts: [
    "This floppy orange fish splashes a lot and looks very silly.",
    "An orange fish with whiskers and floppy fins.",
    "It splashes a lot and looks a bit silly.",
    "It is weak now, but it can become a giant serpent.",
  ] },
  { id: 130, name: "Gyarados", slug: "gyarados", type: "water", say: "gare uh doss", facts: [
    "A giant sea serpent can leap out of the water and roar.",
    "A long blue sea serpent with whiskers.",
    "It leaps out of the water and roars.",
    "The angry mouth is full of sharp teeth.",
  ] },
  { id: 131, name: "Lapras", slug: "lapras", type: "water", say: "lap russ", facts: [
    "A kind giant lets friends ride on the shell on its back.",
    "A gentle giant with a gray shell on its back.",
    "Friends can ride on that shell across the water.",
    "It sings when it feels calm.",
  ] },
  { id: 132, name: "Ditto", slug: "ditto", type: "normal", say: "dit toe", facts: [
    "It can smoosh into a copy of whatever is standing nearby.",
    "A purple blob with a simple face.",
    "It squishes into a copy of who is nearby.",
    "The copy can match a face, a color, or a shape.",
  ] },
  { id: 133, name: "Eevee", slug: "eevee", type: "normal", say: "ee vee", facts: [
    "This fluffy buddy can grow up in lots of different ways.",
    "Brown fur, a cream collar, and a bushy tail.",
    "It can grow up in many different ways.",
    "The collar fluffs up when it is excited.",
  ] },
  { id: 134, name: "Vaporeon", slug: "vaporeon", type: "water", say: "vuh, pore ee on", facts: [
    "A fin on its head and a mermaid tail help it swim.",
    "A blue body, a fin on its head, and a fish tail.",
    "It swims by melting into the water around it.",
    "The fin and the tail make it look like a mermaid.",
  ] },
  { id: 135, name: "Jolteon", slug: "jolteon", type: "electric", say: "jol tee on", facts: [
    "Spiky fur stands straight up and crackles with sparks.",
    "Spiky yellow fur and a white ruff.",
    "The spikes crackle when it runs.",
    "It is one of the fastest Pokémon on four legs.",
  ] },
  { id: 136, name: "Flareon", slug: "flareon", type: "fire", say: "flair ee on", facts: [
    "A fluffy collar around its neck stays toasty warm.",
    "Fluffy orange fur and a warm collar.",
    "Heat builds in its body and stays there.",
    "The collar feels toasty, like a scarf.",
  ] },
  { id: 137, name: "Porygon", slug: "porygon", type: "normal", say: "pore ee gon", facts: [
    "Its body is built from chunky digital blocks.",
    "A body made of pink and blue blocks.",
    "It looks like a digital duck.",
    "Sharp corners show it was made on a computer.",
  ] },
  { id: 138, name: "Omanyte", slug: "omanyte", type: "rock", say: "ah man ite", facts: [
    "A spiral shell covers this little swimmer from long ago.",
    "A spiral shell and little tentacles.",
    "It is a swimmer from a very long time ago.",
    "The shell curls like a snail.",
  ] },
  { id: 139, name: "Omastar", slug: "omastar", type: "rock", say: "ah mah star", facts: [
    "Spikes ring the shell of this ancient sea hunter.",
    "Spikes ring a heavy spiral shell.",
    "Tentacles reach out from under the shell.",
    "It is the grown-up hunter of the little fossil.",
  ] },
  { id: 140, name: "Kabuto", slug: "kabuto", type: "rock", say: "kuh, boo toe", facts: [
    "It tucks under a hard round shell, like a living fossil.",
    "Eyes peek from under a hard brown shell.",
    "It is a fossil that came back to life.",
    "The shell covers it like a round shield.",
  ] },
  { id: 141, name: "Kabutops", slug: "kabutops", type: "rock", say: "kuh boo tops", facts: [
    "Sharp blades on its arms cut through the water.",
    "Blades on its arms and a sleek body.",
    "It cuts through the water with those blades.",
    "The eyes still look like the little fossil's eyes.",
  ] },
  { id: 142, name: "Aerodactyl", slug: "aerodactyl", type: "rock", say: "air row, dak till", facts: [
    "Stony wings let this ancient flyer soar.",
    "Stony wings, fangs, and a long tail.",
    "It is an ancient flyer that soars again.",
    "The wings are made of rock, but they still fly.",
  ] },
  { id: 143, name: "Snorlax", slug: "snorlax", type: "normal", say: "snore lacks", facts: [
    "This huge sleepy giant eats a giant meal, then naps.",
    "A huge body, a cream belly, and tiny feet.",
    "It eats a giant meal, then falls asleep.",
    "It can nap in the path and block the whole road.",
  ] },
  { id: 144, name: "Articuno", slug: "articuno", type: "ice", say: "art tick, coo no", facts: [
    "Icy wings freeze the clouds when this legend flies.",
    "Long blue tail streamers and icy wings.",
    "Cold air follows it when it flies.",
    "It is a legend of ice and snow.",
  ] },
  { id: 145, name: "Zapdos", slug: "zapdos", type: "electric", say: "zap dose", facts: [
    "Thunder booms when this electric bird flaps its wings.",
    "Spiky yellow feathers and a sharp beak.",
    "Thunder booms when its wings flap.",
    "It is a legend of lightning.",
  ] },
  { id: 146, name: "Moltres", slug: "moltres", type: "fire", say: "mole trace", facts: [
    "Fire trails behind the burning wings of this legend.",
    "Orange wings that burn like fire.",
    "Flames trail behind it in the sky.",
    "It is a legend of heat and fire.",
  ] },
  { id: 147, name: "Dratini", slug: "dratini", type: "dragon", say: "duh, tee nee", facts: [
    "This tiny dragon sheds its skin each time it grows.",
    "A small blue serpent with a white belly.",
    "It lives in the water and grows into a longer dragon.",
    "Even tiny, it is already a dragon.",
  ] },
  { id: 148, name: "Dragonair", slug: "dragonair", type: "dragon", say: "drag gon, air", facts: [
    "A long, smooth body floats like a friendly serpent.",
    "A long blue body with orbs along its neck.",
    "A pearl shines at the tip of its tail.",
    "It floats as if the air were water.",
  ] },
  { id: 149, name: "Dragonite", slug: "dragonite", type: "dragon", say: "drag gon ite", facts: [
    "Small wings and a round belly make this dragon look kind.",
    "Small wings, antennae, and a round belly.",
    "It can fly faster than a storm wind.",
    "It looks kind, and it is very strong.",
  ] },
  { id: 150, name: "Mewtwo", slug: "mewtwo", type: "psychic", say: "myoo, too", facts: [
    "It looks a lot like Mew, only bigger and much stronger.",
    "A purple body and a tube on its long tail.",
    "It looks like Mew, only taller and stronger.",
    "It was made by people, not born in the wild.",
  ] },
  { id: 151, name: "Mew", slug: "mew", type: "psychic", say: "myoo", facts: [
    "This tiny legend is so small and rare it feels like a secret.",
    "A tiny pink body and a very long tail.",
    "It is so rare it feels like a secret.",
    "It can vanish in a blink.",
  ] },
  { id: 172, name: "Pichu", slug: "pichu", type: "electric", say: "pee choo", facts: [
    "A baby spark mouse has rosy cheeks that crackle.",
    "A tiny yellow mouse with black-tipped ears.",
    "The cheeks spark before it knows how to aim them.",
    "It is the baby form of the famous spark mouse.",
  ] },
  { id: 175, name: "Togepi", slug: "togepi", type: "fairy", say: "toe geh pee", facts: [
    "Happy little spikes cover the shell of this egg buddy.",
    "A round shell covered in happy little spikes.",
    "It rocks the shell when it feels glad.",
    "Kindness helps the egg buddy grow.",
  ] },
  { id: 196, name: "Espeon", slug: "espeon", type: "psychic", say: "ess pee on", facts: [
    "A gem on its forehead glows, and its tail splits in two.",
    "Purple fur, a red gem, and a tail split in two.",
    "The gem glows in the sunshine.",
    "It is the sun form of the fluffy buddy.",
  ] },
  { id: 197, name: "Umbreon", slug: "umbreon", type: "dark", say: "um bree on", facts: [
    "Yellow rings light up when this dark fox slips into the night.",
    "Black fur and yellow rings that light up.",
    "The rings glow brighter at night.",
    "It is the moon form of the fluffy buddy.",
  ] },
  { id: 208, name: "Steelix", slug: "steelix", type: "steel", say: "steel licks", facts: [
    "Bits of metal stack up into a very long steel snake.",
    "Gray metal rocks stacked into a long snake.",
    "Crystals glitter along its body.",
    "It is the steel form of the big rock snake.",
  ] },
  { id: 230, name: "Kingdra", slug: "kingdra", type: "dragon", say: "king druh", facts: [
    "It shoots swirls of water from the snout on its dragon head.",
    "A blue dragon head on a seahorse body.",
    "It shoots swirls of water from its snout.",
    "It can hide deep where other fish cannot go.",
  ] },
  { id: 252, name: "Treecko", slug: "treecko", type: "grass", say: "tree ko", facts: [
    "Little hooks on its feet let this gecko climb trees.",
    "A green gecko with a yellow belly.",
    "Hooks on its feet stick to tree bark.",
    "The tail helps it balance on a branch.",
  ] },
  { id: 255, name: "Torchic", slug: "torchic", type: "fire", say: "tor chick", facts: [
    "A warm fire burns inside this fluffy chick's tummy.",
    "A fluffy orange chick with a cream belly.",
    "A warm fire burns inside its tummy.",
    "It hops more than it flies.",
  ] },
  { id: 258, name: "Mudkip", slug: "mudkip", type: "water", say: "mud kip", facts: [
    "The big fin on its head can feel waves in the water.",
    "A blue body and a big fin on its head.",
    "The fin can feel which way the water moves.",
    "It likes mud as much as it likes water.",
  ] },
  { id: 329, name: "Vibrava", slug: "vibrava", type: "dragon", say: "vie, brah va", facts: [
    "See-through wings buzz like a dragonfly over the sand.",
    "A green body and see-through wings.",
    "The wings buzz like a dragonfly over sand.",
    "Its eyes are big and red.",
  ] },
  { id: 330, name: "Flygon", slug: "flygon", type: "dragon", say: "fly gon", facts: [
    "Its wings hum, and red covers hide its eyes.",
    "Green scales and red covers over its eyes.",
    "The wings hum a sound like a song.",
    "It flies low over the desert.",
  ] },
  { id: 334, name: "Altaria", slug: "altaria", type: "dragon", say: "al, tar ee uh", facts: [
    "Fluffy cloud wings wrap around this singing dragon bird.",
    "A blue bird wrapped in fluffy cloud wings.",
    "It sings with a soft, pretty voice.",
    "The clouds around it feel like cotton.",
  ] },
  { id: 359, name: "Absol", slug: "absol", type: "dark", say: "ab sol", facts: [
    "The horn on its head is a warning that trouble is near.",
    "White fur, a dark face, and a curved horn.",
    "The horn is a warning that a storm is near.",
    "It would rather warn friends than scare them.",
  ] },
  { id: 371, name: "Bagon", slug: "bagon", type: "dragon", say: "bay gon", facts: [
    "This little dragon bonks its head to make its skull tougher.",
    "A little gray dragon with a hard head.",
    "It bonks its head to make the skull tougher.",
    "It dreams of growing wings.",
  ] },
  { id: 372, name: "Shelgon", slug: "shelgon", type: "dragon", say: "shell gon", facts: [
    "A hard shell wraps almost its whole body.",
    "A hard shell covers almost its whole body.",
    "It waits inside while the body changes.",
    "Only its eyes and a bit of face show.",
  ] },
  { id: 373, name: "Salamence", slug: "salamence", type: "dragon", say: "sal uh mence", facts: [
    "Huge wings unfold when this dragon finally breaks free.",
    "Huge red wings and a long tail.",
    "The wings grew because it wanted so badly to fly.",
    "It soars once the shell finally breaks.",
  ] },
  { id: 380, name: "Latias", slug: "latias", type: "dragon", say: "lat ee us", facts: [
    "This red dragon can vanish and then zip through the sky.",
    "A red body shaped a bit like a jet.",
    "It can vanish, then zip across the sky.",
    "White feathers trail from its wings.",
  ] },
  { id: 381, name: "Latios", slug: "latios", type: "dragon", say: "lat ee ohs", facts: [
    "This blue dragon can share a feeling with a friend far away.",
    "A blue body with the same jet shape.",
    "It can share a feeling with a friend far away.",
    "It is a little taller than its red partner.",
  ] },
  { id: 384, name: "Rayquaza", slug: "rayquaza", type: "dragon", say: "ray, kway zuh", facts: [
    "It soars above the clouds and can quiet a wild wind.",
    "A long green body with yellow ring marks.",
    "It lives way up above the clouds.",
    "It can quiet a huge wild wind.",
  ] },
  { id: 393, name: "Piplup", slug: "piplup", type: "water", say: "pip lup", facts: [
    "This proud little penguin flaps its flippers and will not quit.",
    "A blue penguin with a yellow beak and proud eyes.",
    "It flaps its flippers and refuses to give up.",
    "The beak is strong for such a small bird.",
  ] },
  { id: 443, name: "Gible", slug: "gible", type: "dragon", say: "gib bull", facts: [
    "It hides in small caves and chomps with a very big mouth.",
    "A small land shark with a very big mouth.",
    "It hides in little caves and chomps.",
    "Stubby arms stick out from its sides.",
  ] },
  { id: 444, name: "Gabite", slug: "gabite", type: "dragon", say: "gab, bite", facts: [
    "It keeps leaping, even though its wings are still small.",
    "A bigger shark body and still-small wings.",
    "It keeps leaping even before the wings work well.",
    "Sharp teeth show in its big grin.",
  ] },
  { id: 445, name: "Garchomp", slug: "garchomp", type: "dragon", say: "gar chomp", facts: [
    "A tall fin and a shark-like body let it rush across the land.",
    "A tall fin and a body like a land shark.",
    "It can rush across sand faster than a car.",
    "The fin helps it steer at high speed.",
  ] },
  { id: 448, name: "Lucario", slug: "lucario", type: "fighting", say: "loo, car ee oh", facts: [
    "Spikes on its paws help it feel what someone else feels.",
    "Blue fur, a chest spike, and spikes on its paws.",
    "It can feel what someone else is feeling.",
    "It stands on two legs like a fighter.",
  ] },
  { id: 483, name: "Dialga", slug: "dialga", type: "dragon", say: "dee, awl gah", facts: [
    "A bright diamond shines on the chest of this time dragon.",
    "A blue metal body and a diamond on its chest.",
    "Stories say this dragon can change time.",
    "The diamond shines like glass.",
  ] },
  { id: 484, name: "Palkia", slug: "palkia", type: "dragon", say: "pal kee ah", facts: [
    "Pearls on its shoulders glow like bits of outer space.",
    "A pink body with a pearl on each shoulder.",
    "Stories say this dragon can bend space.",
    "The pearls glow like bits of the sky.",
  ] },
  { id: 487, name: "Giratina", slug: "giratina", type: "dragon", say: "geer ah, tee nuh", facts: [
    "Ghostly wings and lots of legs let it slip between worlds.",
    "Gold bands, ghostly wings, and many legs.",
    "It can slip into a world beside our own.",
    "Six legs make it look like no other dragon.",
  ] },
  { id: 610, name: "Axew", slug: "axew", type: "dragon", say: "axe you", facts: [
    "Little tusks stick out from this cute dragon's cheeks.",
    "A small green dragon with tusks on its cheeks.",
    "It rubs those tusks on rocks to polish them.",
    "The tusks start little and grow huge.",
  ] },
  { id: 611, name: "Fraxure", slug: "fraxure", type: "dragon", say: "frak shur", facts: [
    "Those tusks can crunch right through a hard rock.",
    "Bigger tusks and a tougher green body.",
    "The tusks can crunch a hard rock.",
    "Marks on the tusks show how much it has bitten.",
  ] },
  { id: 612, name: "Haxorus", slug: "haxorus", type: "dragon", say: "hax soar us", facts: [
    "Huge tusks and tough skin make this dragon mighty.",
    "Armor plates and tusks as big as swords.",
    "It can cut through a tree trunk with one tusk.",
    "This is the mighty end of the tusk family.",
  ] },
  { id: 621, name: "Druddigon", slug: "druddigon", type: "dragon", say: "drud dig gun", facts: [
    "A rough red face and a spiky tail guard its cave.",
    "A rough red face and a spiky tail.",
    "It guards the mouth of its cave.",
    "The face looks like a stone mask.",
  ] },
  { id: 633, name: "Deino", slug: "deino", type: "dragon", say: "dye no", facts: [
    "This little dragon bites first, because it cannot see yet.",
    "Black fur and a face with no eyes yet.",
    "It bumps around and bites to learn the world.",
    "The little tuft of hair sticks up.",
  ] },
  { id: 634, name: "Zweilous", slug: "zweilous", type: "dragon", say: "zvye luss", facts: [
    "Two heads bicker, then team up for one big chomp.",
    "Two heads on one dark, fuzzy body.",
    "The heads argue, then bite as a team.",
    "It still cannot see, so it feels its way.",
  ] },
  { id: 635, name: "Hydreigon", slug: "hydreigon", type: "dragon", say: "hi, dry gun", facts: [
    "Three heads roar while six wings carry it through the dark.",
    "One big head, two arm heads, and six wings.",
    "All three heads can roar together.",
    "It flies through the dark on those wings.",
  ] },
  { id: 643, name: "Reshiram", slug: "reshiram", type: "dragon", say: "resh ih ram", facts: [
    "A white dragon's tail burns like a giant torch.",
    "A white dragon with a tail like a torch.",
    "Blue eyes shine in its fluffy mane.",
    "Fire pours from the tail when it is serious.",
  ] },
  { id: 644, name: "Zekrom", slug: "zekrom", type: "dragon", say: "zeck rom", facts: [
    "A black dragon hides a thunderstorm inside its tail.",
    "A black dragon with a tail full of thunder.",
    "Red eyes glow in its heavy mane.",
    "The tail can crack like a storm.",
  ] },
  { id: 646, name: "Kyurem", slug: "kyurem", type: "dragon", say: "kyoo rem", facts: [
    "Cold breath and icy wings can freeze the air around it.",
    "A gray body, icy wings, and a cold breath.",
    "Ice covers its head like a mask.",
    "The air around it can freeze.",
  ] },
  { id: 658, name: "Greninja", slug: "greninja", type: "water", say: "greh, nin jah", facts: [
    "A long tongue scarf whips out like a splash of water.",
    "A frog ninja with a long tongue scarf.",
    "It throws a shuriken made of water.",
    "Bubbles on its hands help the throw.",
  ] },
  { id: 700, name: "Sylveon", slug: "sylveon", type: "fairy", say: "sill vee on", facts: [
    "Ribbon feelers swirl around and make everyone feel calm.",
    "Pink fur, bows, and ribbon feelers.",
    "The ribbons swirl and help friends feel calm.",
    "It senses feelings through those ribbons.",
  ] },
  { id: 704, name: "Goomy", slug: "goomy", type: "dragon", say: "goo mee", facts: [
    "This gooey little dragon is slippery and very shy.",
    "A tiny purple dragon made of goo.",
    "Two little horns poke out of its head.",
    "It is slippery, shy, and very squishy.",
  ] },
  { id: 705, name: "Sliggoo", slug: "sliggoo", type: "dragon", say: "slee goo", facts: [
    "A gooey shell sits on its back like a melted snail.",
    "A snail-like body with a gooey shell.",
    "Its eyes are hidden under the goo.",
    "It slides along and leaves a wet trail.",
  ] },
  { id: 706, name: "Goodra", slug: "goodra", type: "dragon", say: "goo druh", facts: [
    "This friendly goo dragon gives big squishy hugs.",
    "A big friendly dragon with gooey horns.",
    "It gives squishy hugs when it likes you.",
    "The slime makes it hard to hold on to.",
  ] },
  { id: 714, name: "Noibat", slug: "noibat", type: "dragon", say: "noy bat", facts: [
    "Huge ears listen hard while it hangs upside down.",
    "A small bat with enormous ears.",
    "It hangs upside down and listens.",
    "Its ears send a sound people can barely hear.",
  ] },
  { id: 715, name: "Noivern", slug: "noivern", type: "dragon", say: "noy vern", facts: [
    "Giant ears and wide wings help it fly in the dark.",
    "Giant ears and wide wings on a big body.",
    "A blast of sound booms from its mouth.",
    "It flies in the dark using those ears.",
  ] },
  { id: 718, name: "Zygarde", slug: "zygarde", type: "dragon", say: "zye gard", facts: [
    "Green hexagon bits can snap together into one guardian.",
    "Green and black pieces like little cells.",
    "The cells can join into a dog shape.",
    "They can also stretch into a long snake.",
  ] },
  { id: 776, name: "Turtonator", slug: "turtonator", type: "dragon", say: "turt nay ter", facts: [
    "A spiky shell on its back can blast fire from its nose.",
    "A spiky shell and a nose that puffs fire.",
    "The shell can blast open when it is hit.",
    "It looks like a turtle mixed with a dragon.",
  ] },
  { id: 778, name: "Mimikyu", slug: "mimikyu", type: "ghost", say: "mee mee kyoo", facts: [
    "A ragged costume hides a shy little shadow underneath.",
    "A ragged cloth costume with a drawn-on face.",
    "A shy shadow hides underneath the disguise.",
    "The costume is sewn to look like a famous mouse.",
  ] },
  { id: 780, name: "Drampa", slug: "drampa", type: "dragon", say: "dram puh", facts: [
    "A fluffy beard and a kind face make this dragon gentle.",
    "A fluffy beard and a gentle old face.",
    "It likes to play with children.",
    "The beard is as soft as a cloud.",
  ] },
  { id: 782, name: "Jangmo-o", slug: "jangmoo", type: "dragon", say: "jang, moh oh", facts: [
    "Scales on its body clang like a tiny gong.",
    "Yellow scales on a small gray dragon.",
    "The scales clang together like a tiny gong.",
    "It practices that sound every day.",
  ] },
  { id: 783, name: "Hakamo-o", slug: "hakamoo", type: "dragon", say: "hah kah, moh oh", facts: [
    "It bangs its scales together to practice a battle song.",
    "Bigger scales and stronger arms.",
    "It bangs the scales to practice a battle song.",
    "The clanging is louder than the little one's.",
  ] },
  { id: 784, name: "Kommo-o", slug: "kommoo", type: "dragon", say: "koh, moh oh", facts: [
    "Clanging scales boom like a great big drum.",
    "Scales all over its body like armor.",
    "It clangs them so they boom like a drum.",
    "A beard of scales hangs from its chin.",
  ] },
  { id: 840, name: "Applin", slug: "applin", type: "dragon", say: "ap lin", facts: [
    "A little worm peeks out of a shiny red apple.",
    "A shiny red apple with a little worm inside.",
    "Two eyes and a mouth peek from the apple.",
    "The apple is its home and its armor.",
  ] },
  { id: 841, name: "Flapple", slug: "flapple", type: "dragon", say: "flap ul", facts: [
    "Apple skins on its cheeks flap so it can flutter.",
    "Apple skin on its cheeks flaps like wings.",
    "It flutters with a sour little face.",
    "The flaps are pieces of its old apple.",
  ] },
  { id: 842, name: "Appletun", slug: "appletun", type: "dragon", say: "apple tun", facts: [
    "A gooey apple pie shell covers this sweet dragon.",
    "A round body like a gooey apple pie.",
    "The back smells sweet and looks syrupy.",
    "It is the sweet, heavy form of the apple worm.",
  ] },
  { id: 884, name: "Duraludon", slug: "duraludon", type: "dragon", say: "duh, ral uh don", facts: [
    "A tall metal head makes it look a bit like a building.",
    "A tall metal head like a building.",
    "Its body is shiny and hard.",
    "It stands straight, the way a tower does.",
  ] },
  { id: 885, name: "Dreepy", slug: "dreepy", type: "dragon", say: "dree pee", facts: [
    "A tiny ghost dragon floats with its little arms out.",
    "A tiny ghost dragon with little arms out.",
    "It floats like a dart.",
    "It likes to hide near a bigger friend.",
  ] },
  { id: 886, name: "Drakloak", slug: "drakloak", type: "dragon", say: "drak cloak", facts: [
    "A baby Dreepy rides safe between the horns on its head.",
    "A Dreepy rides between the horns on its head.",
    "It gets sad if that little rider is missing.",
    "The cloak of its body looks like a jet.",
  ] },
  { id: 887, name: "Dragapult", slug: "dragapult", type: "dragon", say: "drag uh pult", facts: [
    "The horns on its head can launch little dragons like darts.",
    "Horns on its head can launch little dragons.",
    "It looks like a stealth jet with a face.",
    "The little riders shoot out like darts.",
  ] },
  { id: 895, name: "Regidrago", slug: "regidrago", type: "dragon", say: "rej ee, drah go", facts: [
    "Glowing dragon orbs spin around the crystals on its fists.",
    "A crystal ball for a head and energy in its fists.",
    "Glowing dragon orbs spin around its hands.",
    "The orbs are bits of dragon power.",
  ] },
  { id: 967, name: "Cyclizar", slug: "cyclizar", type: "dragon", say: "sigh kli zar", facts: [
    "A wheel in its chest and a seat on its back are made for a rider.",
    "A wheel in its chest and a seat on its back.",
    "People have ridden it like a bike for a long time.",
    "The tail helps it steer.",
  ] },
  { id: 978, name: "Tatsugiri", slug: "tatsugiri", type: "dragon", say: "tot soo gee ree", facts: [
    "This curly little dragon looks just like a piece of sushi.",
    "A curly little dragon that looks like sushi.",
    "A smile peeks out of the roll.",
    "It is tiny, but it bosses bigger friends around.",
  ] },
  { id: 996, name: "Frigibax", slug: "frigibax", type: "dragon", say: "fri juh bax", facts: [
    "A fin on its head helps this chilly dragon stay cool.",
    "A fin of ice on a small dragon's head.",
    "It likes cold places and cool shade.",
    "The fin helps it stay chilly.",
  ] },
  { id: 997, name: "Arctibax", slug: "arctibax", type: "dragon", say: "ark tuh bax", facts: [
    "Ice wraps its fins like a suit of frozen armor.",
    "Ice wraps its face and fins like frozen armor.",
    "It slides on the ice it makes.",
    "The armor is thicker than the little fin.",
  ] },
  { id: 998, name: "Baxcalibur", slug: "baxcalibur", type: "dragon", say: "bak, ska luh burr", facts: [
    "A huge axe made of ice folds out from its back.",
    "A huge axe of ice folds out from its back.",
    "It can blast that icy axe forward.",
    "It walks tall, like a frozen knight.",
  ] },
  { id: 1007, name: "Koraidon", slug: "koraidon", type: "dragon", say: "koh, rye don", facts: [
    "This ancient red lizard races on wheels like a feathered bike.",
    "A red ancient lizard with feathers and wheels.",
    "It races as if it were a feathered bike.",
    "The wheels are part of its legs.",
  ] },
  { id: 1008, name: "Miraidon", slug: "miraidon", type: "dragon", say: "meer, rye don", facts: [
    "This future purple lizard glides on wheels full of electricity.",
    "A purple future lizard with electric wheels.",
    "It glides and sparks while it rides.",
    "The wheels glow when it speeds up.",
  ] }
];

const fieldEl = document.getElementById("field");
const cheerEl = document.getElementById("cheer");
const caughtListEl = document.getElementById("caught-list");
const progressEl = document.getElementById("progress");
const resetBtn = document.getElementById("reset-btn");
const cryPlayer = new Audio();

function soundOn() {
  return !window.Kids || window.Kids.sound.enabled;
}

const field = [];
const caught = [];
const slotButtons = [];
let locked = false;

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function spriteUrl(id) {
  const padded = String(id).padStart(SPRITE_PAD, "0");
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padded}.png`;
}

function fullArtUrl(id) {
  const padded = String(id).padStart(SPRITE_PAD, "0");
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padded}.png`;
}

function cryUrl(slug) {
  return `https://play.pokemonshowdown.com/audio/cries/${slug}.mp3`;
}

// Generation sprites and animated art stay on the showdown host already used for cries.
const SHOWDOWN_SPRITES = "https://play.pokemonshowdown.com/sprites";
const GALLERY_GENS = [1, 2, 3, 4, 5, 6];

const SPEAKER_SVG =
  '<svg class="speaker-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3z"/>' +
  '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 8.5a5 5 0 0 1 0 7M18.8 6a9 9 0 0 1 0 12"/>' +
  "</svg>";

function typeSymbolUrl(typeId) {
  return `energy/${TYPES[typeId].symbol}.png`;
}

// iPad Safari stretches hyphenated capital syllables and ignores IPA.
// `say` is already lowercase words. A comma sits before the stressed syllable.
const SPEAK_RATE = 0.82;
const SPEAK_LANG = "en-US";
const CANCEL_SPEAK_GAP_MS = 70;
const VOICE_NAMES = ["samantha", "karen", "moira", "kathy", "victoria"];

let speakTimer = null;
let pickedVoice = null;
let voicesWarmed = false;

function warmVoices() {
  const s = window.speechSynthesis;
  if (!s || voicesWarmed) return;
  voicesWarmed = true;
  const choose = () => {
    const voices = s.getVoices() || [];
    const english = voices.filter((v) => /^en([-_]|$)/i.test(v.lang || ""));
    const american = english.filter((v) => /en-US/i.test(v.lang || ""));
    const pool = american.length ? american : english;
    let pick = null;
    for (let i = 0; i < VOICE_NAMES.length && !pick; i += 1) {
      const hint = VOICE_NAMES[i];
      pick = pool.find((v) => (v.name || "").toLowerCase().indexOf(hint) !== -1) || null;
    }
    if (!pick) {
      pick =
        pool.find((v) => !/novelty|albert|bad news|whisper|zarvox|bells|boing|bubbles/i.test(v.name || "")) ||
        null;
    }
    pickedVoice = pick;
  };
  try {
    s.getVoices();
  } catch (e) {
    /* ignore */
  }
  choose();
  if (typeof s.addEventListener === "function") s.addEventListener("voiceschanged", choose);
}

function clearSpeakTimer() {
  if (speakTimer != null) {
    window.clearTimeout(speakTimer);
    speakTimer = null;
  }
}

function makeUtterance(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = SPEAK_LANG;
  u.rate = SPEAK_RATE;
  u.pitch = 1.05;
  if (pickedVoice) u.voice = pickedVoice;
  return u;
}

function speakNow(text) {
  const s = window.speechSynthesis;
  if (!s || !soundOn() || !text) return;
  try {
    if (s.paused) s.resume();
  } catch (e) {
    /* ignore */
  }
  try {
    s.speak(makeUtterance(text));
  } catch (e) {
    /* speech not available */
  }
}

function speakListNow(lines) {
  lines.forEach((line) => {
    if (line) speakNow(line);
  });
}

function speak(text) {
  if (!soundOn() || !text || !window.speechSynthesis) return;
  warmVoices();
  const s = window.speechSynthesis;
  clearSpeakTimer();
  try {
    if (s.speaking || s.pending) {
      s.cancel();
      speakTimer = window.setTimeout(() => {
        speakTimer = null;
        speakNow(text);
      }, CANCEL_SPEAK_GAP_MS);
    } else {
      speakNow(text);
    }
  } catch (e) {
    /* speech not available */
  }
}

function speakLines(lines) {
  const text = (lines || []).filter(Boolean);
  if (!soundOn() || !text.length || !window.speechSynthesis) return;
  warmVoices();
  const s = window.speechSynthesis;
  clearSpeakTimer();
  try {
    if (s.speaking || s.pending) {
      s.cancel();
      speakTimer = window.setTimeout(() => {
        speakTimer = null;
        speakListNow(text);
      }, CANCEL_SPEAK_GAP_MS);
    } else {
      speakListNow(text);
    }
  } catch (e) {
    /* speech not available */
  }
}

function stopTalking() {
  clearSpeakTimer();
  if (window.Kids) window.Kids.sound.cancel();
  else if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function spokenName(poke) {
  return poke.say || poke.name;
}

function playOfficialCry(slug) {
  if (!soundOn()) return;
  cryPlayer.pause();
  cryPlayer.src = cryUrl(slug);
  cryPlayer.play().catch(() => {});
}

function hearName(poke) {
  speak(spokenName(poke));
  playOfficialCry(poke.slug);
}

// Episode screenshots on these hosts are not a stable picture of one Pokémon, so series stills are skipped.
function galleryPictures(poke) {
  const pics = [{ label: "Official art", url: fullArtUrl(poke.id) }];
  GALLERY_GENS.forEach((gen) => {
    pics.push({
      label: `Generation ${gen}`,
      url: `${SHOWDOWN_SPRITES}/gen${gen}/${poke.slug}.png`,
    });
  });
  pics.push({ label: "3D art", url: `${SHOWDOWN_SPRITES}/home/${poke.slug}.png` });
  return pics;
}

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

function playChime(kind) {
  if (!soundOn()) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  if (kind === "complete") {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, i * 0.14, 0.5, 0.18, "triangle"));
  }
}

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

function celebrateAll() {
  cheerEl.textContent = "WOW! You caught ALL the Pokémon! You are a Pokémon expert!";
  playChime("complete");
  speak("Wow! You caught all the Pokémon! You are a Pokémon expert!");
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < 5; i += 1) {
    window.setTimeout(() => burstAt(Math.random() * w, h * 0.1 + Math.random() * h * 0.5, true), i * 180);
  }
}

function pickSpawn(excludeIds) {
  const pool = ROSTER.filter((p) => !excludeIds.includes(p.id));
  const source = pool.length ? pool : ROSTER;
  return source[randomInt(0, source.length - 1)];
}

function applyTypeStyle(el, typeId) {
  const type = TYPES[typeId];
  el.style.setProperty("--tile", type.bg);
  el.style.setProperty("--tile-text", type.text);
}

function fillTypeRow(el, poke) {
  const type = TYPES[poke.type];
  el.querySelector(".type-symbol").src = typeSymbolUrl(poke.type);
  el.querySelector(".type-symbol").alt = "";
  el.querySelector(".type-name").textContent = type.name;
}

function fillCard(btn, poke, index) {
  btn.dataset.index = String(index);
  btn.classList.remove("catching");
  btn.setAttribute("aria-label", `Catch ${poke.name}`);
  applyTypeStyle(btn, poke.type);
  btn.querySelector(".poke-sprite").src = spriteUrl(poke.id);
  btn.querySelector(".poke-sprite").alt = poke.name;
  btn.querySelector(".poke-name").textContent = poke.name;
  fillTypeRow(btn, poke);
}

function makeTypeRow() {
  const row = document.createElement("span");
  row.className = "type-row";
  const symbol = document.createElement("img");
  symbol.className = "type-symbol";
  symbol.alt = "";
  const name = document.createElement("span");
  name.className = "type-name";
  row.append(symbol, name);
  return row;
}

function makeFieldCard(index) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "poke-card";

  const img = document.createElement("img");
  img.className = "poke-sprite";
  img.alt = "";
  const name = document.createElement("span");
  name.className = "poke-name";
  const ball = document.createElement("span");
  ball.className = "ball";
  ball.setAttribute("aria-hidden", "true");

  btn.append(img, name, makeTypeRow(), ball);
  btn.addEventListener("click", () => onCatch(Number(btn.dataset.index)));
  fillCard(btn, field[index], index);
  return btn;
}

function renderCaught() {
  caughtListEl.replaceChildren();
  if (!caught.length) {
    const empty = document.createElement("p");
    empty.className = "caught-empty";
    empty.textContent = "No Pokémon yet";
    caughtListEl.appendChild(empty);
    return;
  }

  caught.forEach((poke) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "caught-card";
    btn.setAttribute("aria-label", `Open the info card for ${poke.name}`);
    applyTypeStyle(btn, poke.type);

    const img = document.createElement("img");
    img.className = "poke-sprite";
    img.src = spriteUrl(poke.id);
    img.alt = "";
    const name = document.createElement("span");
    name.className = "caught-name";
    name.textContent = poke.name;
    const hint = document.createElement("span");
    hint.className = "tap-hint";
    hint.textContent = "Tap for info";

    btn.append(img, name, makeTypeRow(), hint);
    fillTypeRow(btn, poke);
    btn.addEventListener("click", () => openInfo(poke));
    li.appendChild(btn);
    caughtListEl.appendChild(li);
  });
}

function saveCaught() {
  if (window.Kids) window.Kids.store.set(CAUGHT_KEY, caught.map((p) => p.id));
}

function updateProgress() {
  if (!progressEl) return;
  progressEl.textContent = `Caught ${caught.length} of ${ROSTER.length}`;
}

function addToCaught(poke) {
  if (caught.some((p) => p.id === poke.id)) return;
  caught.push(poke);
  saveCaught();
  renderCaught();
  updateProgress();
}

function restoreCaught() {
  if (!window.Kids) return;
  const ids = window.Kids.store.get(CAUGHT_KEY, []);
  if (!Array.isArray(ids)) return;
  const byId = new Map(ROSTER.map((p) => [p.id, p]));
  ids.forEach((id) => {
    const poke = byId.get(id);
    if (poke && !caught.some((p) => p.id === poke.id)) caught.push(poke);
  });
}

function onCatch(index) {
  if (locked) return;
  const poke = field[index];
  if (!poke) return;

  locked = true;
  const btn = slotButtons[index];
  btn.classList.add("catching");

  const isNew = !caught.some((p) => p.id === poke.id);
  const completes = isNew && caught.length + 1 === ROSTER.length;
  const rect = btn.getBoundingClientRect();
  addToCaught(poke);

  if (completes) {
    burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
    celebrateAll();
  } else {
    cheerEl.textContent = `You caught ${poke.name}!`;
    hearName(poke);
  }

  window.setTimeout(() => {
    field[index] = pickSpawn(field.map((p) => p.id));
    fillCard(btn, field[index], index);
    locked = false;
  }, CATCH_MS);
}

/* ---------- Info card ---------- */

let modalEls = null;
let currentId = null;
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
      <p class="modal-type"></p>
      <button class="modal-hear" type="button">${SPEAKER_SVG}<span>Hear it</span></button>
      <div class="modal-section">
        <h3>Wonder facts <span class="photo-hint fact-pos"></span></h3>
        <ul class="fact-list"></ul>
        <button class="modal-hear modal-another" type="button">Another fact</button>
      </div>
      <div class="modal-section">
        <h3>Pictures <span class="photo-hint">(tap to see bigger)</span></h3>
        <div class="gallery" aria-live="polite"></div>
        <p class="modal-credit">Pictures from the Pokémon site and Pokémon Showdown.</p>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="lightbox-backdrop" data-lb-close></div>
    <div class="lightbox-inner">
      <button class="lightbox-close" type="button" data-lb-close aria-label="Close picture">&times;</button>
      <img class="lightbox-img" alt="" draggable="false" />
      <p class="lightbox-credit"></p>
    </div>`;
  document.body.appendChild(lightbox);

  const typeRow = makeTypeRow();
  overlay.querySelector(".modal-type").appendChild(typeRow);

  modalEls = {
    overlay,
    card: overlay.querySelector(".modal-card"),
    close: overlay.querySelector(".modal-close"),
    hero: overlay.querySelector(".modal-hero"),
    img: overlay.querySelector(".modal-img"),
    name: overlay.querySelector(".modal-name"),
    nameSay: overlay.querySelector(".modal-name-say"),
    hear: overlay.querySelector(".modal-hear:not(.modal-another)"),
    another: overlay.querySelector(".modal-another"),
    factPos: overlay.querySelector(".fact-pos"),
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

let factIndex = 0;

function pokeFacts(poke) {
  return poke.facts && poke.facts.length ? poke.facts : [];
}

function renderFact(poke) {
  const facts = pokeFacts(poke);
  const text = facts[factIndex] || "";
  modalEls.facts.replaceChildren();
  const li = document.createElement("li");
  li.className = "fact-item";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "say-btn";
  btn.setAttribute("aria-label", "Hear this fact");
  btn.innerHTML = SPEAKER_SVG;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    speak(text);
  });
  const span = document.createElement("span");
  span.className = "fact-text";
  span.textContent = text;
  li.append(btn, span);
  li.addEventListener("click", () => speak(text));
  modalEls.facts.appendChild(li);
  modalEls.factPos.textContent = facts.length ? `Fact ${factIndex + 1} of ${facts.length}` : "";
}

function nextFact(poke) {
  const facts = pokeFacts(poke);
  if (facts.length < 2) return;
  factIndex = (factIndex + 1) % facts.length;
  renderFact(poke);
  speak(facts[factIndex]);
}

function showPictures(poke) {
  const token = poke.id;
  modalEls.gallery.replaceChildren();
  galleryPictures(poke).forEach((pic) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery-item";
    btn.hidden = true;
    btn.setAttribute("aria-label", `See a bigger ${pic.label} picture of ${poke.name}`);
    const img = document.createElement("img");
    img.alt = `${pic.label} picture of ${poke.name}`;
    img.draggable = false;
    const cap = document.createElement("span");
    cap.className = "gallery-credit";
    cap.textContent = pic.label;
    btn.append(img, cap);
    btn.addEventListener("click", () => openLightbox(pic, poke));
    img.onload = () => {
      if (currentId === token) btn.hidden = false;
    };
    img.onerror = () => btn.remove();
    img.src = pic.url;
    modalEls.gallery.appendChild(btn);
  });
}

function openLightbox(pic, poke) {
  modalEls.lightImg.src = pic.url;
  modalEls.lightImg.alt = `${pic.label} picture of ${poke.name}`;
  modalEls.lightCredit.textContent = pic.label;
  modalEls.lightbox.hidden = false;
  modalEls.lightClose.focus();
}

function closeLightbox() {
  if (!modalEls || modalEls.lightbox.hidden) return;
  modalEls.lightbox.hidden = true;
  modalEls.lightImg.removeAttribute("src");
  modalEls.close.focus();
}

function openInfo(poke) {
  if (!modalEls) buildModal();
  currentId = poke.id;
  lastFocused = document.activeElement;

  const token = poke.id;
  const facts = pokeFacts(poke);
  factIndex = 0;
  modalEls.img.alt = poke.name;
  modalEls.img.dataset.fallback = "0";
  modalEls.img.onerror = () => {
    if (currentId !== token) return;
    const step = modalEls.img.dataset.fallback;
    if (step === "0") {
      modalEls.img.dataset.fallback = "1";
      modalEls.img.src = spriteUrl(poke.id);
    } else if (step === "1") {
      modalEls.img.dataset.fallback = "2";
      modalEls.img.src = `${SHOWDOWN_SPRITES}/home/${poke.slug}.png`;
    }
  };
  modalEls.img.src = fullArtUrl(poke.id);
  modalEls.hero.style.background = TYPES[poke.type].bg;
  modalEls.name.textContent = poke.name;
  modalEls.nameSay.onclick = () => hearName(poke);
  fillTypeRow(modalEls.card, poke);
  modalEls.hear.onclick = () => speakLines([spokenName(poke), facts[0] || ""]);
  modalEls.another.onclick = () => nextFact(poke);
  renderFact(poke);
  showPictures(poke);

  modalEls.overlay.hidden = false;
  document.body.classList.add("modal-open");
  modalEls.card.scrollTop = 0;
  modalEls.close.focus();
  speakLines([spokenName(poke), facts[0] || ""]);
  playOfficialCry(poke.slug);
}

function closeInfo() {
  if (!modalEls || modalEls.overlay.hidden) return;
  stopTalking();
  cryPlayer.pause();
  closeLightbox();
  modalEls.overlay.hidden = true;
  document.body.classList.remove("modal-open");
  currentId = null;
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

function initReadToMe() {
  if (!window.Kids) return;
  const bar = document.getElementById("kids-topbar");
  if (bar) {
    bar.appendChild(window.Kids.homeButton("../"));
    const spacer = document.createElement("span");
    spacer.className = "kids-topbar-spacer";
    bar.appendChild(spacer);
    bar.appendChild(window.Kids.muteButton());
  }
  const label = document.getElementById("how-to");
  if (label) label.appendChild(window.Kids.hearButton(HOW_TO_TEXT, { ariaLabel: "Hear how to play" }));
  window.Kids.speakInstructionOnce(HOW_TO_TEXT);
}

function initReset() {
  if (!resetBtn) return;
  resetBtn.addEventListener("click", () => {
    if (!caught.length) return;
    if (!window.confirm("Start over and let all your Pokémon go?")) return;
    caught.length = 0;
    saveCaught();
    renderCaught();
    updateProgress();
    cheerEl.textContent = "All set — go catch some more!";
  });
}

function start() {
  warmVoices();
  initReadToMe();
  initReset();
  restoreCaught();
  const exclude = [];
  for (let i = 0; i < FIELD_SIZE; i += 1) {
    const poke = pickSpawn(exclude);
    exclude.push(poke.id);
    field.push(poke);
    const btn = makeFieldCard(i);
    slotButtons.push(btn);
    fieldEl.appendChild(btn);
  }
  renderCaught();
  updateProgress();
}

start();
