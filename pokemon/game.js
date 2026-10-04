const FIELD_SIZE = 3;
const CATCH_MS = 1000;
const SPRITE_PAD = 3;
const CAUGHT_KEY = "pokemon-caught-v1";
const HOW_TO_TEXT = "Tap a Pokémon to catch it. Tap one you caught to hear a fact and see pictures.";

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
  { id: 1, name: "Bulbasaur", slug: "bulbasaur", type: "grass", say: "BUL-ba-sore", fact: "A green plant bulb sits on its back and grows along with it." },
  { id: 2, name: "Ivysaur", slug: "ivysaur", type: "grass", say: "EYE-vee-sore", fact: "The bud on its back is almost ready to bloom." },
  { id: 3, name: "Venusaur", slug: "venusaur", type: "grass", say: "VEE-nuh-sore", fact: "A giant flower blooms right on its back." },
  { id: 4, name: "Charmander", slug: "charmander", type: "fire", say: "CHAR-man-der", fact: "A little flame always burns on the tip of its tail." },
  { id: 5, name: "Charmeleon", slug: "charmeleon", type: "fire", say: "char-MEE-lee-un", fact: "The flame on its tail burns brighter as it grows." },
  { id: 6, name: "Charizard", slug: "charizard", type: "fire", say: "CHAR-ih-zard", fact: "This orange dragon can breathe a huge stream of fire." },
  { id: 7, name: "Squirtle", slug: "squirtle", type: "water", say: "SKWIR-tul", fact: "It ducks into its shell and squirts water out." },
  { id: 8, name: "Wartortle", slug: "wartortle", type: "water", say: "WOR-TORE-tul", fact: "Fluffy ears and a fluffy tail help it zip through the water." },
  { id: 9, name: "Blastoise", slug: "blastoise", type: "water", say: "BLAS-toyce", fact: "Two water cannons stick out of the shell on its back." },
  { id: 10, name: "Caterpie", slug: "caterpie", type: "bug", say: "CAT-ur-pee", fact: "Tiny feet let this little bug climb straight up." },
  { id: 11, name: "Metapod", slug: "metapod", type: "bug", say: "MET-uh-pod", fact: "It stays very still inside a hard green shell." },
  { id: 12, name: "Butterfree", slug: "butterfree", type: "bug", say: "BUT-er-free", fact: "Pretty wings carry this bug from flower to flower." },
  { id: 13, name: "Weedle", slug: "weedle", type: "bug", say: "WEE-dull", fact: "A little sting sits right on top of its head." },
  { id: 14, name: "Kakuna", slug: "kakuna", type: "bug", say: "kah-KOO-na", fact: "It hangs quiet and still while its body changes." },
  { id: 15, name: "Beedrill", slug: "beedrill", type: "bug", say: "BEE-dril", fact: "Sharp stingers poke out from its arms and its tail." },
  { id: 16, name: "Pidgey", slug: "pidgey", type: "normal", say: "PIDG-ee", fact: "This small bird flaps hard just above the grass." },
  { id: 17, name: "Pidgeotto", slug: "pidgeotto", type: "normal", say: "PIDG-ee-OH-toe", fact: "Bigger wings help this bird fly much farther." },
  { id: 18, name: "Pidgeot", slug: "pidgeot", type: "normal", say: "PIDG-ee-ott", fact: "It flies so fast the wind roars past its wings." },
  { id: 19, name: "Rattata", slug: "rattata", type: "normal", say: "RA-TAT-ta", fact: "Big front teeth help this little mouse nibble." },
  { id: 20, name: "Raticate", slug: "raticate", type: "normal", say: "RAT-ih-kate", fact: "Long whiskers and sharp teeth make this mouse tough." },
  { id: 21, name: "Spearow", slug: "spearow", type: "normal", say: "SPEER-oh", fact: "It flaps tiny wings and pecks with a pointy beak." },
  { id: 22, name: "Fearow", slug: "fearow", type: "normal", say: "FEER-oh", fact: "A long neck lets this big bird peck far away." },
  { id: 23, name: "Ekans", slug: "ekans", type: "poison", say: "ECK-kins", fact: "This purple snake shakes its tail when it is upset." },
  { id: 24, name: "Arbok", slug: "arbok", type: "poison", say: "ARE-bock", fact: "A fierce face pattern spreads across its big hood." },
  { id: 25, name: "Pikachu", slug: "pikachu", type: "electric", say: "PEE-ka-choo", fact: "The red circles on its cheeks can spark." },
  { id: 26, name: "Raichu", slug: "raichu", type: "electric", say: "RYE-choo", fact: "A long tail can slam down an even bigger spark." },
  { id: 27, name: "Sandshrew", slug: "sandshrew", type: "ground", say: "SAND-shroo", fact: "It curls into a spiky ball to hide in the sand." },
  { id: 28, name: "Sandslash", slug: "sandslash", type: "ground", say: "SAND-slash", fact: "Sharp quills cover its back like a walking cactus." },
  { id: 29, name: "Nidoran♀", slug: "nidoranf", type: "poison", say: "NEE-do-ran female", fact: "Tiny ears and a little horn mark this one as the girl." },
  { id: 30, name: "Nidorina", slug: "nidorina", type: "poison", say: "NEE-do-REE-na", fact: "It is gentle, and a short horn grows on its head." },
  { id: 31, name: "Nidoqueen", slug: "nidoqueen", type: "poison", say: "NEE-do-kween", fact: "A strong horn and thick hide protect this big queen." },
  { id: 32, name: "Nidoran♂", slug: "nidoranm", type: "poison", say: "NEE-do-ran male", fact: "Bigger ears and a brave little horn mark this one as the boy." },
  { id: 33, name: "Nidorino", slug: "nidorino", type: "poison", say: "NEE-do-REE-no", fact: "The horn on its head gets harder as it grows." },
  { id: 34, name: "Nidoking", slug: "nidoking", type: "poison", say: "NEE-do-king", fact: "A huge horn and a thick tail make it very tough." },
  { id: 35, name: "Clefairy", slug: "clefairy", type: "fairy", say: "kleh-FAIR-ee", fact: "Tiny wings on its back are too small for real flying." },
  { id: 36, name: "Clefable", slug: "clefable", type: "fairy", say: "kleh-FAY-bull", fact: "It listens closely, then bounces off on little wings." },
  { id: 37, name: "Vulpix", slug: "vulpix", type: "fire", say: "VULL-picks", fact: "Six fluffy tails curl behind this little fox." },
  { id: 38, name: "Ninetales", slug: "ninetales", type: "fire", say: "NINE-tails", fact: "Nine long tails fan out around this elegant fox." },
  { id: 39, name: "Jigglypuff", slug: "jigglypuff", type: "normal", say: "JIG-lee-puff", fact: "This round singer can puff up big like a balloon." },
  { id: 40, name: "Wigglytuff", slug: "wigglytuff", type: "normal", say: "WIG-lee-tuff", fact: "Huge eyes shine on a very round, very soft body." },
  { id: 41, name: "Zubat", slug: "zubat", type: "poison", say: "ZOO-bat", fact: "It hangs in dark caves and listens with big ears." },
  { id: 42, name: "Golbat", slug: "golbat", type: "poison", say: "GOHL-bat", fact: "Wide wings and four fangs help it fly at night." },
  { id: 43, name: "Oddish", slug: "oddish", type: "grass", say: "ODD-ish", fact: "Green leaves sprout from the top of its head." },
  { id: 44, name: "Gloom", slug: "gloom", type: "grass", say: "GLOOM", fact: "A droopy flower on its head has a very strong smell." },
  { id: 45, name: "Vileplume", slug: "vileplume", type: "grass", say: "VILE-ploom", fact: "A huge red flower blooms right on top of its head." },
  { id: 46, name: "Paras", slug: "paras", type: "bug", say: "PAIR-us", fact: "Two little mushrooms grow on this bug's back." },
  { id: 47, name: "Parasect", slug: "parasect", type: "bug", say: "PARA-sekt", fact: "A giant mushroom sits where this bug's back should be." },
  { id: 48, name: "Venonat", slug: "venonat", type: "bug", say: "VEH-no-nat", fact: "Big round eyes glow in the dark like tiny lamps." },
  { id: 49, name: "Venomoth", slug: "venomoth", type: "bug", say: "VEH-no-moth", fact: "Its dusty wings can shake out an itchy powder." },
  { id: 50, name: "Diglett", slug: "diglett", type: "ground", say: "DIG-let", fact: "Only its head pops up out of a hole in the dirt." },
  { id: 51, name: "Dugtrio", slug: "dugtrio", type: "ground", say: "DUG-TREE-oh", fact: "Three heads pop out of one hole in the ground." },
  { id: 52, name: "Meowth", slug: "meowth", type: "normal", say: "mee-OWTH", fact: "This cat walks on two feet and loves shiny coins." },
  { id: 53, name: "Persian", slug: "persian", type: "normal", say: "PER-zhun", fact: "A red jewel shines in the middle of its forehead." },
  { id: 54, name: "Psyduck", slug: "psyduck", type: "water", say: "SY-duck", fact: "It holds its head when a headache makes it dizzy." },
  { id: 55, name: "Golduck", slug: "golduck", type: "water", say: "GOL-duck", fact: "A red gem on its forehead glows while it swims." },
  { id: 56, name: "Mankey", slug: "mankey", type: "fighting", say: "MANG-key", fact: "This monkey gets grumpy and swings a long tail." },
  { id: 57, name: "Primeape", slug: "primeape", type: "fighting", say: "PRIME-ape", fact: "It stomps the ground and shows a pig-like snout." },
  { id: 58, name: "Growlithe", slug: "growlithe", type: "fire", say: "GROWL-lith", fact: "Stripes and a fluffy mane make this puppy look brave." },
  { id: 59, name: "Arcanine", slug: "arcanine", type: "fire", say: "ARE-ka-nine", fact: "A big mane and fast legs make this dog look proud." },
  { id: 60, name: "Poliwag", slug: "poliwag", type: "water", say: "PAUL-lee-wag", fact: "A swirl on its round belly shows through its skin." },
  { id: 61, name: "Poliwhirl", slug: "poliwhirl", type: "water", say: "PAUL-lee-wirl", fact: "It stands up, and the swirl on its belly keeps spinning." },
  { id: 62, name: "Poliwrath", slug: "poliwrath", type: "water", say: "PAUL-lee-rath", fact: "Strong arms spin along with the swirl on its belly." },
  { id: 63, name: "Abra", slug: "abra", type: "psychic", say: "AB-ra", fact: "It sleeps almost all day, then pops somewhere else." },
  { id: 64, name: "Kadabra", slug: "kadabra", type: "psychic", say: "kuh-DAB-ra", fact: "A spoon floats beside it while it thinks very hard." },
  { id: 65, name: "Alakazam", slug: "alakazam", type: "psychic", say: "AL-a-kuh-ZAM", fact: "It holds a spoon in each hand and thinks super fast." },
  { id: 66, name: "Machop", slug: "machop", type: "fighting", say: "muh-CHOP", fact: "This little fighter practices punches every day." },
  { id: 67, name: "Machoke", slug: "machoke", type: "fighting", say: "muh-CHOKE", fact: "A belt around its waist helps it lift heavy things." },
  { id: 68, name: "Machamp", slug: "machamp", type: "fighting", say: "muh-CHAMP", fact: "Four strong arms can throw a whole bunch of punches." },
  { id: 69, name: "Bellsprout", slug: "bellsprout", type: "grass", say: "BELL-sprout", fact: "Its thin green body bends like a little plant bell." },
  { id: 70, name: "Weepinbell", slug: "weepinbell", type: "grass", say: "WEE-pin-bell", fact: "Two leafy bells hang down where its mouth should be." },
  { id: 71, name: "Victreebel", slug: "victreebel", type: "grass", say: "VICK-tree-bell", fact: "A big leafy mouth can snap shut like a plant trap." },
  { id: 72, name: "Tentacool", slug: "tentacool", type: "water", say: "TEN-ta-cool", fact: "Two shiny eyes glow on this floating water blob." },
  { id: 73, name: "Tentacruel", slug: "tentacruel", type: "water", say: "TEN-ta-crool", fact: "Lots of long arms trail under its red body." },
  { id: 74, name: "Geodude", slug: "geodude", type: "rock", say: "JEE-oh-dude", fact: "This round rock has arms and a grumpy stony face." },
  { id: 75, name: "Graveler", slug: "graveler", type: "rock", say: "GRAV-el-ler", fact: "Four rocky arms help it roll down a hill." },
  { id: 76, name: "Golem", slug: "golem", type: "rock", say: "GO-lum", fact: "A heavy rocky shell covers almost its whole body." },
  { id: 77, name: "Ponyta", slug: "ponyta", type: "fire", say: "POH-nee-tah", fact: "Little flames flicker in this horse's mane." },
  { id: 78, name: "Rapidash", slug: "rapidash", type: "fire", say: "RAP-id-dash", fact: "A fiery mane streams back when it gallops." },
  { id: 79, name: "Slowpoke", slug: "slowpoke", type: "water", say: "SLOW-poke", fact: "It stares into space and takes a long time to notice you." },
  { id: 80, name: "Slowbro", slug: "slowbro", type: "water", say: "SLOW-bro", fact: "A shell clamps onto its tail and will not let go." },
  { id: 81, name: "Magnemite", slug: "magnemite", type: "electric", say: "MAG-ne-mite", fact: "Screws on its sides pull it toward anything metal." },
  { id: 82, name: "Magneton", slug: "magneton", type: "electric", say: "MAG-ne-ton", fact: "Three magnets snap together into one buzzing body." },
  { id: 83, name: "Farfetch’d", slug: "farfetchd", type: "normal", say: "FAR-fetched", fact: "It carries a long green onion like a little sword." },
  { id: 84, name: "Doduo", slug: "doduo", type: "normal", say: "doe-DOO-oh", fact: "Two heads share one speedy bird body." },
  { id: 85, name: "Dodrio", slug: "dodrio", type: "normal", say: "doe-DREE-oh", fact: "Three heads can look three different ways at once." },
  { id: 86, name: "Seel", slug: "seel", type: "water", say: "SEEL", fact: "This white sea pup has a little horn on its head." },
  { id: 87, name: "Dewgong", slug: "dewgong", type: "water", say: "DOO-gong", fact: "A long white body glides through icy water." },
  { id: 88, name: "Grimer", slug: "grimer", type: "poison", say: "GRY-mur", fact: "This purple blob oozes slowly along the ground." },
  { id: 89, name: "Muk", slug: "muk", type: "poison", say: "MUCK", fact: "A bigger gooey blob leaves a sticky trail behind it." },
  { id: 90, name: "Shellder", slug: "shellder", type: "water", say: "SHELL-der", fact: "Its two shells can clamp shut just like a clam." },
  { id: 91, name: "Cloyster", slug: "cloyster", type: "water", say: "CLOY-stur", fact: "A spiky shell stays shut tight until it wants to bite." },
  { id: 92, name: "Gastly", slug: "gastly", type: "ghost", say: "GAST-lee", fact: "A spooky face peeks out of a purple cloud of gas." },
  { id: 93, name: "Haunter", slug: "haunter", type: "ghost", say: "HAUNT-ur", fact: "It floats along with a big grin and ghostly hands." },
  { id: 94, name: "Gengar", slug: "gengar", type: "ghost", say: "GHEN-gar", fact: "A wide spooky smile glows when the lights go out." },
  { id: 95, name: "Onix", slug: "onix", type: "rock", say: "ON-icks", fact: "This long rock snake digs deep tunnels underground." },
  { id: 96, name: "Drowzee", slug: "drowzee", type: "psychic", say: "DROW-zee", fact: "Its long nose swings while it daydreams." },
  { id: 97, name: "Hypno", slug: "hypno", type: "psychic", say: "HIP-no", fact: "A swinging pendulum makes sleepy eyes even sleepier." },
  { id: 98, name: "Krabby", slug: "krabby", type: "water", say: "KRAB-ee", fact: "One claw is much bigger and pinches much harder." },
  { id: 99, name: "Kingler", slug: "kingler", type: "water", say: "KING-lur", fact: "A giant claw can pinch something as big as a coconut." },
  { id: 100, name: "Voltorb", slug: "voltorb", type: "electric", say: "VOLT-orb", fact: "It looks like a round toy ball that can suddenly zap." },
  { id: 101, name: "Electrode", slug: "electrode", type: "electric", say: "ee-LECK-trode", fact: "This ball rolls around, then pops with electricity." },
  { id: 102, name: "Exeggcute", slug: "exeggcute", type: "grass", say: "ECKS-egg-cute", fact: "Six little eggs huddle together in a bunch." },
  { id: 103, name: "Exeggutor", slug: "exeggutor", type: "grass", say: "ecks-EGG-u-tore", fact: "Three coconut heads grow on one tall body." },
  { id: 104, name: "Cubone", slug: "cubone", type: "ground", say: "CUE-bone", fact: "It wears a little bone helmet wherever it goes." },
  { id: 105, name: "Marowak", slug: "marowak", type: "ground", say: "MARE-oh-wack", fact: "It swings a long bone like a club." },
  { id: 106, name: "Hitmonlee", slug: "hitmonlee", type: "fighting", say: "HIT-mon-LEE", fact: "Springy legs can kick higher than its own head." },
  { id: 107, name: "Hitmonchan", slug: "hitmonchan", type: "fighting", say: "HIT-mon-CHAN", fact: "Fast fists punch like a tiny boxer." },
  { id: 108, name: "Lickitung", slug: "lickitung", type: "normal", say: "LICK-it-tung", fact: "A huge tongue can stretch way, way out." },
  { id: 109, name: "Koffing", slug: "koffing", type: "poison", say: "KOFF-ing", fact: "This round gas ball floats and puffs smelly air." },
  { id: 110, name: "Weezing", slug: "weezing", type: "poison", say: "WEEZ-ing", fact: "Three smoky heads leak stinky puffs at once." },
  { id: 111, name: "Rhyhorn", slug: "rhyhorn", type: "ground", say: "RYE-horn", fact: "A tough horn and rocky hide help it charge ahead." },
  { id: 112, name: "Rhydon", slug: "rhydon", type: "ground", say: "RYE-don", fact: "A bigger horn can drill right through rock." },
  { id: 113, name: "Chansey", slug: "chansey", type: "normal", say: "CHAN-see", fact: "A tiny egg rides safe in the pouch on its tummy." },
  { id: 114, name: "Tangela", slug: "tangela", type: "grass", say: "TANG-ghel-a", fact: "Blue vines cover it like a wiggly mop." },
  { id: 115, name: "Kangaskhan", slug: "kangaskhan", type: "normal", say: "KANG-gas-con", fact: "A baby peeks out of the pouch on its tummy." },
  { id: 116, name: "Horsea", slug: "horsea", type: "water", say: "HOR-SEE", fact: "A curly tail pushes this little water dragon along." },
  { id: 117, name: "Seadra", slug: "seadra", type: "water", say: "SEE-dra", fact: "Spiny fins and a long snout make it a fierce swimmer." },
  { id: 118, name: "Goldeen", slug: "goldeen", type: "water", say: "GOL-deen", fact: "A horn on its head gleams like gold underwater." },
  { id: 119, name: "Seaking", slug: "seaking", type: "water", say: "SEE-king", fact: "A sharp horn and a strong tail power this fish." },
  { id: 120, name: "Staryu", slug: "staryu", type: "water", say: "STAR-you", fact: "A red gem glows in the middle of this sea star." },
  { id: 121, name: "Starmie", slug: "starmie", type: "water", say: "STAR-mee", fact: "The gem in its center can sparkle many colors." },
  { id: 122, name: "Mr. Mime", slug: "mrmime", type: "psychic", say: "MIS-ter-MIME", fact: "It can push the air and make an invisible wall." },
  { id: 123, name: "Scyther", slug: "scyther", type: "bug", say: "SY-thur", fact: "Sharp arm blades slice the air when it leaps." },
  { id: 124, name: "Jynx", slug: "jynx", type: "ice", say: "JINX", fact: "It dances on the ice and sings a chilly song." },
  { id: 125, name: "Electabuzz", slug: "electabuzz", type: "electric", say: "eh-LECK-ta-buzz", fact: "Sparks jump between the two antennae on its head." },
  { id: 126, name: "Magmar", slug: "magmar", type: "fire", say: "MAG-marr", fact: "Flames puff from its mouth and from its hands." },
  { id: 127, name: "Pinsir", slug: "pinsir", type: "bug", say: "PIN-sir", fact: "Huge horns can pick up something as heavy as a log." },
  { id: 128, name: "Tauros", slug: "tauros", type: "normal", say: "TORE-ros", fact: "Three tails whip while it charges on strong hooves." },
  { id: 129, name: "Magikarp", slug: "magikarp", type: "water", say: "MADGE-eh-karp", fact: "This floppy orange fish splashes a lot and looks very silly." },
  { id: 130, name: "Gyarados", slug: "gyarados", type: "water", say: "GARE-uh-dos", fact: "A giant sea serpent can leap out of the water and roar." },
  { id: 131, name: "Lapras", slug: "lapras", type: "water", say: "LAP-rus", fact: "A kind giant lets friends ride on the shell on its back." },
  { id: 132, name: "Ditto", slug: "ditto", type: "normal", say: "DIT-toe", fact: "It can smoosh into a copy of whatever is standing nearby." },
  { id: 133, name: "Eevee", slug: "eevee", type: "normal", say: "EE-vee", fact: "This fluffy buddy can grow up in lots of different ways." },
  { id: 134, name: "Vaporeon", slug: "vaporeon", type: "water", say: "vay-POUR-ree-on", fact: "A fin on its head and a mermaid tail help it swim." },
  { id: 135, name: "Jolteon", slug: "jolteon", type: "electric", say: "JOL-tee-on", fact: "Spiky fur stands straight up and crackles with sparks." },
  { id: 136, name: "Flareon", slug: "flareon", type: "fire", say: "FLAIR-ee-on", fact: "A fluffy collar around its neck stays toasty warm." },
  { id: 137, name: "Porygon", slug: "porygon", type: "normal", say: "PORE-ee-gon", fact: "Its body is built from chunky digital blocks." },
  { id: 138, name: "Omanyte", slug: "omanyte", type: "rock", say: "AH-man-ite", fact: "A spiral shell covers this little swimmer from long ago." },
  { id: 139, name: "Omastar", slug: "omastar", type: "rock", say: "AH-mah-star", fact: "Spikes ring the shell of this ancient sea hunter." },
  { id: 140, name: "Kabuto", slug: "kabuto", type: "rock", say: "ka-BOO-toe", fact: "It tucks under a hard round shell, like a living fossil." },
  { id: 141, name: "Kabutops", slug: "kabutops", type: "rock", say: "KA-boo-tops", fact: "Sharp blades on its arms cut through the water." },
  { id: 142, name: "Aerodactyl", slug: "aerodactyl", type: "rock", say: "AIR-row-DACK-tull", fact: "Stony wings let this ancient flyer soar." },
  { id: 143, name: "Snorlax", slug: "snorlax", type: "normal", say: "SNOR-lacks", fact: "This huge sleepy giant eats a giant meal, then naps." },
  { id: 144, name: "Articuno", slug: "articuno", type: "ice", say: "ART-tick-COO-no", fact: "Icy wings freeze the clouds when this legend flies." },
  { id: 145, name: "Zapdos", slug: "zapdos", type: "electric", say: "ZAP-dose", fact: "Thunder booms when this electric bird flaps its wings." },
  { id: 146, name: "Moltres", slug: "moltres", type: "fire", say: "MOHL-trace", fact: "Fire trails behind the burning wings of this legend." },
  { id: 147, name: "Dratini", slug: "dratini", type: "dragon", say: "dra-TEE-nee", fact: "This tiny dragon sheds its skin each time it grows." },
  { id: 148, name: "Dragonair", slug: "dragonair", type: "dragon", say: "DRAG-gon-AIR", fact: "A long, smooth body floats like a friendly serpent." },
  { id: 149, name: "Dragonite", slug: "dragonite", type: "dragon", say: "DRAG-gon-ite", fact: "Small wings and a round belly make this dragon look kind." },
  { id: 150, name: "Mewtwo", slug: "mewtwo", type: "psychic", say: "MUE-TOO", fact: "It looks a lot like Mew, only bigger and much stronger." },
  { id: 151, name: "Mew", slug: "mew", type: "psychic", say: "MUE", fact: "This tiny legend is so small and rare it feels like a secret." },
  { id: 172, name: "Pichu", slug: "pichu", type: "electric", say: "PEE-choo", fact: "A baby spark mouse has rosy cheeks that crackle." },
  { id: 175, name: "Togepi", slug: "togepi", type: "fairy", say: "TOE-geh-pee", fact: "Happy little spikes cover the shell of this egg buddy." },
  { id: 196, name: "Espeon", slug: "espeon", type: "psychic", say: "ESS-pee-on", fact: "A gem on its forehead glows, and its tail splits in two." },
  { id: 197, name: "Umbreon", slug: "umbreon", type: "dark", say: "UM-bree-on", fact: "Yellow rings light up when this dark fox slips into the night." },
  { id: 208, name: "Steelix", slug: "steelix", type: "steel", say: "STEE-licks", fact: "Bits of metal stack up into a very long steel snake." },
  { id: 230, name: "Kingdra", slug: "kingdra", type: "dragon", say: "KING-dra", fact: "It shoots swirls of water from the snout on its dragon head." },
  { id: 252, name: "Treecko", slug: "treecko", type: "grass", say: "TREE-ko", fact: "Little hooks on its feet let this gecko climb trees." },
  { id: 255, name: "Torchic", slug: "torchic", type: "fire", say: "TOR-chick", fact: "A warm fire burns inside this fluffy chick's tummy." },
  { id: 258, name: "Mudkip", slug: "mudkip", type: "water", say: "MUD-kip", fact: "The big fin on its head can feel waves in the water." },
  { id: 329, name: "Vibrava", slug: "vibrava", type: "dragon", say: "VY-BRAH-va", fact: "See-through wings buzz like a dragonfly over the sand." },
  { id: 330, name: "Flygon", slug: "flygon", type: "dragon", say: "FLY-gon", fact: "Its wings hum, and red covers hide its eyes." },
  { id: 334, name: "Altaria", slug: "altaria", type: "dragon", say: "ahl-TAR-ee-uh", fact: "Fluffy cloud wings wrap around this singing dragon bird." },
  { id: 359, name: "Absol", slug: "absol", type: "dark", say: "AB-sahl", fact: "The horn on its head is a warning that trouble is near." },
  { id: 371, name: "Bagon", slug: "bagon", type: "dragon", say: "BAY-gon", fact: "This little dragon bonks its head to make its skull tougher." },
  { id: 372, name: "Shelgon", slug: "shelgon", type: "dragon", say: "SHELL-gon", fact: "A hard shell wraps almost its whole body." },
  { id: 373, name: "Salamence", slug: "salamence", type: "dragon", say: "SAL-uh-mence", fact: "Huge wings unfold when this dragon finally breaks free." },
  { id: 380, name: "Latias", slug: "latias", type: "dragon", say: "LAT-ee-ahs", fact: "This red dragon can vanish and then zip through the sky." },
  { id: 381, name: "Latios", slug: "latios", type: "dragon", say: "LAT-ee-ose", fact: "This blue dragon can share a feeling with a friend far away." },
  { id: 384, name: "Rayquaza", slug: "rayquaza", type: "dragon", say: "ray-KWAY-zuh", fact: "It soars above the clouds and can quiet a wild wind." },
  { id: 393, name: "Piplup", slug: "piplup", type: "water", say: "PIP-lup", fact: "This proud little penguin flaps its flippers and will not quit." },
  { id: 443, name: "Gible", slug: "gible", type: "dragon", say: "GIB-bull", fact: "It hides in small caves and chomps with a very big mouth." },
  { id: 444, name: "Gabite", slug: "gabite", type: "dragon", say: "gab-BITE", fact: "It keeps leaping, even though its wings are still small." },
  { id: 445, name: "Garchomp", slug: "garchomp", type: "dragon", say: "GAR-chomp", fact: "A tall fin and a shark-like body let it rush across the land." },
  { id: 448, name: "Lucario", slug: "lucario", type: "fighting", say: "loo-CAR-ee-oh", fact: "Spikes on its paws help it feel what someone else feels." },
  { id: 483, name: "Dialga", slug: "dialga", type: "dragon", say: "dee-AWL-gah", fact: "A bright diamond shines on the chest of this time dragon." },
  { id: 484, name: "Palkia", slug: "palkia", type: "dragon", say: "PALL-kee-ah", fact: "Pearls on its shoulders glow like bits of outer space." },
  { id: 487, name: "Giratina", slug: "giratina", type: "dragon", say: "geer-ah-TEE-nuh", fact: "Ghostly wings and lots of legs let it slip between worlds." },
  { id: 610, name: "Axew", slug: "axew", type: "dragon", say: "AKS-yoo", fact: "Little tusks stick out from this cute dragon's cheeks." },
  { id: 611, name: "Fraxure", slug: "fraxure", type: "dragon", say: "FRAK-shur", fact: "Those tusks can crunch right through a hard rock." },
  { id: 612, name: "Haxorus", slug: "haxorus", type: "dragon", say: "HAK-soar-us", fact: "Huge tusks and tough skin make this dragon mighty." },
  { id: 621, name: "Druddigon", slug: "druddigon", type: "dragon", say: "DRUD-dig-guhn", fact: "A rough red face and a spiky tail guard its cave." },
  { id: 633, name: "Deino", slug: "deino", type: "dragon", say: "DY-noh", fact: "This little dragon bites first, because it cannot see yet." },
  { id: 634, name: "Zweilous", slug: "zweilous", type: "dragon", say: "ZVY-lus", fact: "Two heads bicker, then team up for one big chomp." },
  { id: 635, name: "Hydreigon", slug: "hydreigon", type: "dragon", say: "hy-DRY-guhn", fact: "Three heads roar while six wings carry it through the dark." },
  { id: 643, name: "Reshiram", slug: "reshiram", type: "dragon", say: "RESH-i-ram", fact: "A white dragon's tail burns like a giant torch." },
  { id: 644, name: "Zekrom", slug: "zekrom", type: "dragon", say: "ZECK-rahm", fact: "A black dragon hides a thunderstorm inside its tail." },
  { id: 646, name: "Kyurem", slug: "kyurem", type: "dragon", say: "KYOOR-rem", fact: "Cold breath and icy wings can freeze the air around it." },
  { id: 658, name: "Greninja", slug: "greninja", type: "water", say: "greh-NIN-jah", fact: "A long tongue scarf whips out like a splash of water." },
  { id: 700, name: "Sylveon", slug: "sylveon", type: "fairy", say: "SIL-vee-on", fact: "Ribbon feelers swirl around and make everyone feel calm." },
  { id: 704, name: "Goomy", slug: "goomy", type: "dragon", say: "GOO-mee", fact: "This gooey little dragon is slippery and very shy." },
  { id: 705, name: "Sliggoo", slug: "sliggoo", type: "dragon", say: "SLIH-goo", fact: "A gooey shell sits on its back like a melted snail." },
  { id: 706, name: "Goodra", slug: "goodra", type: "dragon", say: "GOO-druh", fact: "This friendly goo dragon gives big squishy hugs." },
  { id: 714, name: "Noibat", slug: "noibat", type: "dragon", say: "NOY-bat", fact: "Huge ears listen hard while it hangs upside down." },
  { id: 715, name: "Noivern", slug: "noivern", type: "dragon", say: "NOY-vurn", fact: "Giant ears and wide wings help it fly in the dark." },
  { id: 718, name: "Zygarde", slug: "zygarde", type: "dragon", say: "ZY-gard", fact: "Green hexagon bits can snap together into one guardian." },
  { id: 776, name: "Turtonator", slug: "turtonator", type: "dragon", say: "TURT-nay-ter", fact: "A spiky shell on its back can blast fire from its nose." },
  { id: 778, name: "Mimikyu", slug: "mimikyu", type: "ghost", say: "MEE-mee-kyoo", fact: "A ragged costume hides a shy little shadow underneath." },
  { id: 780, name: "Drampa", slug: "drampa", type: "dragon", say: "DRAM-puh", fact: "A fluffy beard and a kind face make this dragon gentle." },
  { id: 782, name: "Jangmo-o", slug: "jangmoo", type: "dragon", say: "JANG-MOH-oh", fact: "Scales on its body clang like a tiny gong." },
  { id: 783, name: "Hakamo-o", slug: "hakamoo", type: "dragon", say: "HAH-kah-MOH-oh", fact: "It bangs its scales together to practice a battle song." },
  { id: 784, name: "Kommo-o", slug: "kommoo", type: "dragon", say: "koh-MOH-oh", fact: "Clanging scales boom like a great big drum." },
  { id: 840, name: "Applin", slug: "applin", type: "dragon", say: "AP-lin", fact: "A little worm peeks out of a shiny red apple." },
  { id: 841, name: "Flapple", slug: "flapple", type: "dragon", say: "FLAP-puhl", fact: "Apple skins on its cheeks flap so it can flutter." },
  { id: 842, name: "Appletun", slug: "appletun", type: "dragon", say: "AP-pell-tun", fact: "A gooey apple pie shell covers this sweet dragon." },
  { id: 884, name: "Duraludon", slug: "duraludon", type: "dragon", say: "duh-RAL-uh-dahn", fact: "A tall metal head makes it look a bit like a building." },
  { id: 885, name: "Dreepy", slug: "dreepy", type: "dragon", say: "DREE-pee", fact: "A tiny ghost dragon floats with its little arms out." },
  { id: 886, name: "Drakloak", slug: "drakloak", type: "dragon", say: "DRAK-klohkk", fact: "A baby Dreepy rides safe between the horns on its head." },
  { id: 887, name: "Dragapult", slug: "dragapult", type: "dragon", say: "DRAG-uh-pult", fact: "The horns on its head can launch little dragons like darts." },
  { id: 895, name: "Regidrago", slug: "regidrago", type: "dragon", say: "REDGE-ee-DRAH-go", fact: "Glowing dragon orbs spin around the crystals on its fists." },
  { id: 967, name: "Cyclizar", slug: "cyclizar", type: "dragon", say: "SYE-clih-zahr", fact: "A wheel in its chest and a seat on its back are made for a rider." },
  { id: 978, name: "Tatsugiri", slug: "tatsugiri", type: "dragon", say: "TAHT-soo-gee-ree", fact: "This curly little dragon looks just like a piece of sushi." },
  { id: 996, name: "Frigibax", slug: "frigibax", type: "dragon", say: "FRI-juh-baks", fact: "A fin on its head helps this chilly dragon stay cool." },
  { id: 997, name: "Arctibax", slug: "arctibax", type: "dragon", say: "ARK-tuh-baks", fact: "Ice wraps its fins like a suit of frozen armor." },
  { id: 998, name: "Baxcalibur", slug: "baxcalibur", type: "dragon", say: "bak-SKA-leh-burr", fact: "A huge axe made of ice folds out from its back." },
  { id: 1007, name: "Koraidon", slug: "koraidon", type: "dragon", say: "koh-RAI-dahn", fact: "This ancient red lizard races on wheels like a feathered bike." },
  { id: 1008, name: "Miraidon", slug: "miraidon", type: "dragon", say: "meer-RAI-dahn", fact: "This future purple lizard glides on wheels full of electricity." },
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

// A few respelling syllables that web speech would misread if said as written.
const SPEAK_TOKEN = {
  pidg: "pidge",
  ecks: "ex",
  ghen: "gen",
  mue: "myoo",
  rai: "rye",
  sye: "sigh",
  redge: "rej",
  zvy: "zvye",
  klohkk: "cloak",
  puhl: "pull",
  dahn: "don",
  mis: "miss",
  ott: "ot",
  toyce: "toys",
};

function typeSymbolUrl(typeId) {
  return `energy/${TYPES[typeId].symbol}.png`;
}

function speak(text) {
  if (!soundOn() || !text) return;
  if (window.Kids) {
    window.Kids.sound.speak(text, { rate: 0.9, pitch: 1.05 });
    return;
  }
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 1.05;
  window.setTimeout(() => window.speechSynthesis.speak(u), 70);
}

function speakLines(lines) {
  const text = (lines || []).filter(Boolean);
  if (!soundOn() || !text.length) return;
  if (window.Kids && window.Kids.sound.speakQueue) {
    window.Kids.sound.speakQueue(text, { rate: 0.9, pitch: 1.05 });
    return;
  }
  speak(text.join(". "));
}

function stopTalking() {
  if (window.Kids) window.Kids.sound.cancel();
  else if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function forSpeech(say) {
  if (!say) return "";
  return say
    .replace(/['’]/g, "")
    .split(/[\s-]+/)
    .map((part) => {
      const low = part.toLowerCase();
      return SPEAK_TOKEN[low] || low;
    })
    .join(" ");
}

function compactSpeak(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function spokenName(poke) {
  const said = forSpeech(poke.say);
  if (!said) return poke.name;
  if (compactSpeak(said) === compactSpeak(poke.name)) return poke.name;
  return said;
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

function galleryPictures(poke) {
  const pics = GALLERY_GENS.map((gen) => ({
    label: `Generation ${gen}`,
    url: `${SHOWDOWN_SPRITES}/gen${gen}/${poke.slug}.png`,
  }));
  pics.push({ label: "Animated", url: `${SHOWDOWN_SPRITES}/ani/${poke.slug}.gif` });
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
        <h3>Wonder fact</h3>
        <ul class="fact-list"></ul>
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
    hear: overlay.querySelector(".modal-hear"),
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

function fillFact(poke) {
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
    speak(poke.fact);
  });
  const span = document.createElement("span");
  span.className = "fact-text";
  span.textContent = poke.fact;
  li.append(btn, span);
  li.addEventListener("click", () => speak(poke.fact));
  modalEls.facts.appendChild(li);
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
  modalEls.img.alt = poke.name;
  modalEls.img.dataset.fallback = "";
  modalEls.img.onerror = () => {
    if (currentId !== token || modalEls.img.dataset.fallback === "1") return;
    modalEls.img.dataset.fallback = "1";
    modalEls.img.src = `${SHOWDOWN_SPRITES}/home/${poke.slug}.png`;
  };
  modalEls.img.src = spriteUrl(poke.id);
  modalEls.hero.style.background = TYPES[poke.type].bg;
  modalEls.name.textContent = poke.name;
  modalEls.nameSay.onclick = () => hearName(poke);
  fillTypeRow(modalEls.card, poke);
  modalEls.hear.onclick = () => speakLines([spokenName(poke), poke.fact]);
  fillFact(poke);
  showPictures(poke);

  modalEls.overlay.hidden = false;
  document.body.classList.add("modal-open");
  modalEls.card.scrollTop = 0;
  modalEls.close.focus();
  speakLines([spokenName(poke), poke.fact]);
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
