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
    "From head to toe it is about 70 centimeters.",
    "It weighs about 6.9 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Bulbasaur first shows up in Bulbasaur and the Hidden Village.",
    "When it grows up, it can become Ivysaur.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/87/Bulbizarre_de_Sacha_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/09/Bulbizarre_de_Sacha.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/bulbasaur.jpg" },
  ] },
  { id: 2, name: "Ivysaur", slug: "ivysaur", type: "grass", say: "eye vee sore", facts: [
    "The bud on its back is almost ready to bloom.",
    "A pink bud sits between the leaves on its back.",
    "Its legs are stronger, so it can carry that heavy bud.",
    "When the bud is ready, a flower is about to open.",
    "From head to toe it is about 1 meter.",
    "It weighs about 13 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, one grows and changes during Tag Team Battle Inspiration!.",
    "It grows up from Bulbasaur, and it can still grow into Venusaur.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/ee/Herbizarre_Fouet_Lianes.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d0/Herbizarre_de_Dresseur_-_Film_20.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/ivysaur.jpg" },
  ] },
  { id: 3, name: "Venusaur", slug: "venusaur", type: "grass", say: "vee nuh sore", facts: [
    "A giant flower blooms right on its back.",
    "Pink petals spread out like a big umbrella.",
    "The flower gets brighter after a sunny day.",
    "This is the biggest form of the little bulb Pokémon.",
    "From head to toe it is about 2 meters.",
    "It weighs about 100 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Venusaur in Pruning a Passel of Pals!.",
    "It grew up from Ivysaur.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/10/Clone_de_Florizarre_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fe/Florizarre_V%C3%A9g%C3%A9-Attak.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/venusaur.jpg" },
  ] },
  { id: 4, name: "Charmander", slug: "charmander", type: "fire", say: "char man der", facts: [
    "A little flame always burns on the tip of its tail.",
    "Its belly is cream colored and its feet are small.",
    "The tail flame burns the whole time it is awake.",
    "If the flame is strong, Charmander feels strong too.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 8.5 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, Charmander first shows up in Charmander - The Stray Pokémon.",
    "When it grows up, it can become Charmeleon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a8/Salam%C3%A8che_de_Trovato.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b1/Salam%C3%A8che_de_Dresseur_-_Film_21_flashback.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/charmander.jpg" },
  ] },
  { id: 5, name: "Charmeleon", slug: "charmeleon", type: "fire", say: "char, mee lee un", facts: [
    "The flame on its tail burns brighter as it grows.",
    "It is redder and has sharper claws than Charmander.",
    "It swishes a fiery tail when it feels fierce.",
    "The flame grows larger as this lizard grows.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 19 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, one grows and changes during The March of the Exeggutor Squad.",
    "It grows up from Charmander, and it can still grow into Charizard.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/5b/PO02_-_Reptincel_de_Red.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/83/PO02_-_Reptincel_de_Red_%28Flash-Back%29.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/charmeleon.jpg" },
  ] },
  { id: 6, name: "Charizard", slug: "charizard", type: "fire", say: "char ih zard", facts: [
    "This orange dragon can breathe a huge stream of fire.",
    "Wide wings and a cream belly make it look huge.",
    "It can fly and blast fire from its mouth.",
    "The flame on its tail keeps burning while it soars.",
    "From head to toe it is about 1.7 meters.",
    "It weighs about 90 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Charizard in Charmander – The Stray Pokémon.",
    "It grew up from Charmeleon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/cf/Clone_de_Dracaufeu_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/33/LH001_-_Dracaufeu_de_Friede.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/charizard.jpg" },
  ] },
  { id: 7, name: "Squirtle", slug: "squirtle", type: "water", say: "skwir tul", facts: [
    "It ducks into its shell and squirts water out.",
    "A brown shell covers its blue body.",
    "It pulls its head and legs inside when it hides.",
    "Water shoots from its mouth in a strong squirt.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 9 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Squirtle in Challenge of the Samurai.",
    "When it grows up, it can become Wartortle.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/39/Carapuce_de_Sacha.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/20/Carapuce_de_Sacha_-_Film_22.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/squirtle.jpg" },
  ] },
  { id: 8, name: "Wartortle", slug: "wartortle", type: "water", say: "war, tore tul", facts: [
    "Fluffy ears and a fluffy tail help it zip through the water.",
    "Dark blue fur and a thick tail help it swim.",
    "The fluffy ears stand up like little wings.",
    "It is the middle step before the cannon turtle.",
    "From head to toe it is about 1 meter.",
    "It weighs about 22 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Wartortle in The Pokémon Water War.",
    "It grows up from Squirtle, and it can still grow into Blastoise.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d7/Carabaffe_de_Dresseur_-_Film_21.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f9/Carabaffe_de_Dresseur_-_Film_20.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/wartortle.jpg" },
  ] },
  { id: 9, name: "Blastoise", slug: "blastoise", type: "water", say: "blas toys", facts: [
    "Two water cannons stick out of the shell on its back.",
    "The shell is heavy, with a cannon on each side.",
    "It can blast water far across a pool.",
    "Those cannons grew where the shell used to be plain.",
    "From head to toe it is about 1.6 meters.",
    "It weighs about 86 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Blastoise in Pokémon: Mega Evolution Special I.",
    "It grew up from Wartortle.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/61/Clone_de_Tortank_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/8a/PE08_-_Tortank.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/blastoise.jpg" },
  ] },
  { id: 10, name: "Caterpie", slug: "caterpie", type: "bug", say: "cat ur pee", facts: [
    "Tiny feet let this little bug climb straight up.",
    "A green body, yellow rings, and a red feeler.",
    "The little feet stick to almost any wall.",
    "This is the caterpillar that becomes a butterfly.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 2.9 kilograms.",
    "It lives around the woods.",
    "In the cartoon, Caterpie first shows up in Pokémon Emergency!.",
    "When it grows up, it can become Metapod.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/08/Chenipan_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fc/LH005_-_Chenipan.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/caterpie.jpg" },
  ] },
  { id: 11, name: "Metapod", slug: "metapod", type: "bug", say: "met uh pod", facts: [
    "It stays very still inside a hard green shell.",
    "Only its eyes show on the hard green shell.",
    "It waits quietly while its body changes inside.",
    "The shell is tough so it can stay safe.",
    "From head to toe it is about 70 centimeters.",
    "It weighs about 9.9 kilograms.",
    "It lives around the woods.",
    "In the cartoon, one grows and changes during Ash Catches a Pokémon.",
    "It grows up from Caterpie, and it can still grow into Butterfree.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/04/Chrysacier_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/ad/Chrysacier_de_Red.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/metapod.jpg" },
  ] },
  { id: 12, name: "Butterfree", slug: "butterfree", type: "bug", say: "but er free", facts: [
    "Pretty wings carry this bug from flower to flower.",
    "Big eyes and white wings with black marks.",
    "Powder shakes off the wings when it flaps.",
    "It flies from flower to flower to drink.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 32 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Butterfree in I Choose You!.",
    "It grew up from Metapod.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/57/LV015_-_Papilusion_Para-Spore.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f6/Papilusion_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/butterfree.jpg" },
  ] },
  { id: 13, name: "Weedle", slug: "weedle", type: "bug", say: "wee dull", facts: [
    "A little sting sits right on top of its head.",
    "A brown bug with a pink nose and a small sting.",
    "The sting on its head is sharp, so it is careful.",
    "This little bug will hang still and change.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 3.2 kilograms.",
    "It lives around the woods.",
    "In the cartoon, Weedle first shows up in Challenge of the Samurai.",
    "When it grows up, it can become Kakuna.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/1f/Aspicot_de_Dresseur_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0c/LH005_-_Aspicot.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/weedle.jpg" },
  ] },
  { id: 14, name: "Kakuna", slug: "kakuna", type: "bug", say: "kah, koo na", facts: [
    "It hangs quiet and still while its body changes.",
    "A yellow shell with two eyes peeking out.",
    "It hangs from a branch and barely moves.",
    "Inside the shell, its body is changing.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 10 kilograms.",
    "It lives around the woods.",
    "In the cartoon, Kakuna first shows up in Challenge of the Samurai.",
    "It grows up from Weedle, and it can still grow into Beedrill.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0a/Coconfort_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2d/NB124_-_Coconfort.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/kakuna.jpg" },
  ] },
  { id: 15, name: "Beedrill", slug: "beedrill", type: "bug", say: "bee dril", facts: [
    "Sharp stingers poke out from its arms and its tail.",
    "Yellow and black, with stripes and fast wings.",
    "Three stingers help it guard its home.",
    "It can zip through the air very quickly.",
    "From head to toe it is about 1 meter.",
    "It weighs about 30 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Beedrill in Volcanion and the Mechanical Marvel.",
    "It grew up from Kakuna.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/87/Dardargnan_A%C3%A9ropique.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/55/Film_04_%26_05_-_Intro_-_Dardargnan_Sauvages.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/beedrill.jpg" },
  ] },
  { id: 16, name: "Pidgey", slug: "pidgey", type: "normal", say: "pidge ee", facts: [
    "This small bird flaps hard just above the grass.",
    "A small brown bird with a short beak.",
    "It flaps low over the grass to look for food.",
    "Its wings are small, but they work hard.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 1.8 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Pidgey in Fly Me to the Moon.",
    "When it grows up, it can become Pidgeotto.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/ea/Roucool_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/1e/Roucool_sauvages_-_Film_21.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/pidgey.jpg" },
  ] },
  { id: 17, name: "Pidgeotto", slug: "pidgeotto", type: "normal", say: "pidge ee, oh toe", facts: [
    "Bigger wings help this bird fly much farther.",
    "A crest of feathers sticks up on its head.",
    "Sharper claws and bigger wings make it braver.",
    "It can fly much farther than the little bird.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 30 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Pidgeotto in Ash Catches a Pokémon.",
    "It grows up from Pidgey, and it can still grow into Pidgeot.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d4/Roucoups_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/15/Roucoups_sauvage_-_Film_21.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/pidgeotto.jpg" },
  ] },
  { id: 18, name: "Pidgeot", slug: "pidgeot", type: "normal", say: "pidge ee ot", facts: [
    "It flies so fast the wind roars past its wings.",
    "A tall crest and very wide wings.",
    "It is one of the fastest birds in the sky.",
    "The wind roars when those big wings beat.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 40 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Pidgeot in Volcanion and the Mechanical Marvel.",
    "It grew up from Pidgeotto.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/af/PE08_-_Roucarnage_de_Trace.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/8d/Roucarnage_Cru-Ailes.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/pidgeot.jpg" },
  ] },
  { id: 19, name: "Rattata", slug: "rattata", type: "normal", say: "ra, tat ta", facts: [
    "Big front teeth help this little mouse nibble.",
    "Purple fur, big ears, and long front teeth.",
    "It nibbles and scurries close to the ground.",
    "Those teeth keep growing, so it gnaws a lot.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 3.5 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Rattata first shows up in Pokémon - I Choose You!.",
    "When it grows up, it can become Raticate.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fd/Rattata_Fouinette_Balignon_film_9.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fa/Rattata_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/rattata.jpg" },
  ] },
  { id: 20, name: "Raticate", slug: "raticate", type: "normal", say: "rat ih kate", facts: [
    "Long whiskers and sharp teeth make this mouse tough.",
    "Brown fur and very long whiskers.",
    "The big fangs make this mouse look tough.",
    "It is the grown-up form of the little purple mouse.",
    "From head to toe it is about 70 centimeters.",
    "It weighs about 18 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Raticate first shows up in Battle Aboard the St. Anne.",
    "It grew up from Rattata.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c1/LV095_-_Rattatac_de_Cassidy_-_Flashback.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/41/Film_04_-_Rattatac_Sauvage.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/raticate.jpg" },
  ] },
  { id: 21, name: "Spearow", slug: "spearow", type: "normal", say: "speer oh", facts: [
    "It flaps tiny wings and pecks with a pointy beak.",
    "A tiny bird with a sharp little beak.",
    "It flaps fast and pecks at anything close.",
    "Even small wings can carry a fierce bird.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 2 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, Spearow first shows up in Pokémon - I Choose You!.",
    "When it grows up, it can become Fearow.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/02/Piafabec_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a7/Piafabec_sauvages_Film_20.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/spearow.jpg" },
  ] },
  { id: 22, name: "Fearow", slug: "fearow", type: "normal", say: "feer oh", facts: [
    "A long neck lets this big bird peck far away.",
    "A long neck and a long, pointy beak.",
    "Huge wings let it swoop from far away.",
    "It can peck something without getting close.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 38 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, you can spot Fearow in the first episode.",
    "It grew up from Spearow.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3e/Rapasdepic_de_Dresseur_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/4f/Rapasdepic_de_Lucas.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/fearow.jpg" },
  ] },
  { id: 23, name: "Ekans", slug: "ekans", type: "poison", say: "ek kins", facts: [
    "This purple snake shakes its tail when it is upset.",
    "A purple snake with a yellow belly.",
    "It rattles the tip of its tail when it is mad.",
    "Its name sounds like snake spelled backward.",
    "From head to toe it is about 2 meters.",
    "It weighs about 6.9 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Ekans first shows up in Pokémon Emergency!.",
    "When it grows up, it can become Arbok.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/dd/Abo_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/16/Abo_de_Jessie.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/ekans.jpg" },
  ] },
  { id: 24, name: "Arbok", slug: "arbok", type: "poison", say: "are bock", facts: [
    "A fierce face pattern spreads across its big hood.",
    "A wide hood opens on its neck.",
    "The pattern on the hood looks like a scary face.",
    "It coils up tall before it strikes.",
    "From head to toe it is about 3.5 meters.",
    "It weighs about 65 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, one grows and changes during Dig Those Diglett!.",
    "It grew up from Ekans.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b0/LH096_-_Arbok.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/cf/DP091_-_Arbok_d%27un_Dresseur.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/arbok.jpg" },
  ] },
  { id: 25, name: "Pikachu", slug: "pikachu", type: "electric", say: "pee kuh choo", facts: [
    "The red circles on its cheeks can spark.",
    "Yellow fur, long ears, and brown back stripes.",
    "The cheeks spark when it is excited or mad.",
    "Its tail is shaped a bit like a lightning bolt.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 6 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Pikachu in Pokémon - I Choose You!.",
    "It grows up from Pichu, and it can still grow into Raichu.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/66/LV096_-_Pikachu_de_Sacha.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/65/LV097_-_Pikachu_de_Sacha.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/pikachu.jpg" },
  ] },
  { id: 26, name: "Raichu", slug: "raichu", type: "electric", say: "rye choo", facts: [
    "A long tail can slam down an even bigger spark.",
    "Orange fur, a white belly, and a long thin tail.",
    "It slams that tail down to let out a big spark.",
    "It is the grown-up form of the little spark mouse.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 30 kilograms.",
    "It lives around the woods.",
    "In the cartoon, Raichu first shows up in Electric Shock Showdown.",
    "It grew up from Pikachu.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/55/LV096_-_Raichu_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9d/LH138_-_Raichu_Bluff.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/raichu.jpg" },
  ] },
  { id: 27, name: "Sandshrew", slug: "sandshrew", type: "ground", say: "sand shrew", facts: [
    "It curls into a spiky ball to hide in the sand.",
    "A yellow body with a brick-like pattern.",
    "It rolls into a ball so the spikes face out.",
    "Dry sand is where it likes to hide.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 12 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, you can spot Sandshrew in The Path to the Pokémon League.",
    "When it grows up, it can become Sandslash.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/07/Sabelette_de_Dresseur_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d4/LV095_-_Sabelette.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/sandshrew.jpg" },
  ] },
  { id: 28, name: "Sandslash", slug: "sandslash", type: "ground", say: "sand slash", facts: [
    "Sharp quills cover its back like a walking cactus.",
    "Long quills and big claws cover this digger.",
    "It can roll forward like a spiky wheel.",
    "The quills are harder than the little one's spikes.",
    "From head to toe it is about 1 meter.",
    "It weighs about 30 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, you can spot Sandslash in Mewtwo Strikes Back.",
    "It grew up from Sandshrew.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0e/LH090_-_Sablaireau_d%27Anne.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b0/LH115_-_Sablaireau_Tour_Rapide.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/sandslash.jpg" },
  ] },
  { id: 29, name: "Nidoran♀", slug: "nidoranf", type: "poison", say: "nee doh ran female", facts: [
    "Tiny ears and a little horn mark this one as the girl.",
    "Small ears, blue-purple fur, and one little horn.",
    "The horn is poisonous, so a poke can sting.",
    "This is the girl, and she is smaller than the boy.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 7 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Nidoran♀ in Wherefore Art Thou, Pokémon?.",
    "When it grows up, it can become Nidorina.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/ef/PO01_-_Nidoran%E2%99%80_d%27un_Dresseur.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a7/Nidoran%E2%99%80_Combo-Griffe.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/nidoran-f.jpg" },
  ] },
  { id: 30, name: "Nidorina", slug: "nidorina", type: "poison", say: "nee doh, ree na", facts: [
    "It is gentle, and a short horn grows on its head.",
    "Blue fur and a short horn on its forehead.",
    "It is calmer and does not pick fights.",
    "The horn is still small, but it is tough.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 20 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Nidorina in Wherefore Art Thou, Pokémon?.",
    "It grows up from Nidoran♀, and it can still grow into Nidoqueen.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/cd/Film_02_-_Nidorina_du_Labo.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/07/EP100_-_Erreur_Nidorina.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/nidorina.jpg" },
  ] },
  { id: 31, name: "Nidoqueen", slug: "nidoqueen", type: "poison", say: "nee doh queen", facts: [
    "A strong horn and thick hide protect this big queen.",
    "A big body, thick skin, and one strong horn.",
    "It stands in front of its family to guard them.",
    "The thick hide is hard to scratch.",
    "From head to toe it is about 1.3 meters.",
    "It weighs about 60 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Nidoqueen first shows up in Mewtwo Strikes Back.",
    "It grew up from Nidorina.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/29/Nidoqueen_%C3%89clate-Roc.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/77/Nidoqueen_de_Giovanni.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/nidoqueen.jpg" },
  ] },
  { id: 32, name: "Nidoran♂", slug: "nidoranm", type: "poison", say: "nee doh ran male", facts: [
    "Bigger ears and a brave little horn mark this one as the boy.",
    "Bigger ears, purple fur, and a pointed horn.",
    "It shows the horn when it wants to look brave.",
    "This is the boy, with ears larger than the girl's.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 9 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Nidoran♂ in I Choose You!.",
    "When it grows up, it can become Nidorino.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/27/LV020_-_Nidoran%E2%99%82_et_Nidoran%E2%99%80_Pok%C3%A9dex.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a8/Nidoran%E2%99%82_de_Red.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/nidoran-m.jpg" },
  ] },
  { id: 33, name: "Nidorino", slug: "nidorino", type: "poison", say: "nee doh, ree no", facts: [
    "The horn on its head gets harder as it grows.",
    "A longer horn and angry eyebrows.",
    "It charges with that horn when it is upset.",
    "The horn gets harder each time it grows.",
    "From head to toe it is about 90 centimeters.",
    "It weighs about 20 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Nidorino in Pokémon - I Choose You!.",
    "It grows up from Nidoran♂, and it can still grow into Nidoking.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d4/Nidorino_de_la_Team_Rocket.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3d/Nidorino_Choc_Venin.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/nidorino.jpg" },
  ] },
  { id: 34, name: "Nidoking", slug: "nidoking", type: "poison", say: "nee doh king", facts: [
    "A huge horn and a thick tail make it very tough.",
    "A huge horn, a thick tail, and a strong body.",
    "It can smash rocks by swinging that tail.",
    "This is the king of the horn family.",
    "From head to toe it is about 1.4 meters.",
    "It weighs about 62 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Nidoking in The Battle of the Badge.",
    "It grew up from Nidorino.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/44/Nidoking_de_R%C3%A9gis_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/20/Nidoking_Cradovague.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/nidoking.jpg" },
  ] },
  { id: 35, name: "Clefairy", slug: "clefairy", type: "fairy", say: "cluh, fair ee", facts: [
    "Tiny wings on its back are too small for real flying.",
    "A pink body, tiny wings, and pointed fingers.",
    "It dances more than it flies.",
    "Those wings are too small to lift it for long.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 7.5 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, Clefairy first shows up in Clefairy Tales.",
    "It grows up from Cleffa, and it can still grow into Clefable.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f7/LV004_-_M%C3%A9lof%C3%A9e_d%27un_Dresseur.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a4/M%C3%A9lof%C3%A9e_Torgnoles.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/clefairy.jpg" },
  ] },
  { id: 36, name: "Clefable", slug: "clefable", type: "fairy", say: "cluh, fay bull", facts: [
    "It listens closely, then bounces off on little wings.",
    "Curly ears and small wings on a pink body.",
    "It bounces away when it wants to be left alone.",
    "It can hear tiny sounds very well.",
    "From head to toe it is about 1.3 meters.",
    "It weighs about 40 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Clefable in A Dream Encounter!.",
    "It grew up from Clefairy.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e2/LH141_-_M%C3%A9lodelfe_Gravit%C3%A9.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/1c/PE08_-_M%C3%A9lodelfe.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/clefable.jpg" },
  ] },
  { id: 37, name: "Vulpix", slug: "vulpix", type: "fire", say: "vul picks", facts: [
    "Six fluffy tails curl behind this little fox.",
    "An orange fox with six curly tails.",
    "The tails fluff up when it feels hot.",
    "Six tails now, and more grow in later.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 9.9 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Vulpix in Pokémon Fashion Flash.",
    "When it grows up, it can become Ninetales.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f2/Film_01_-_Goupix_de_Pierre.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/ed/LV002_-_Goupix_d%27une_Dresseuse.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/vulpix.jpg" },
  ] },
  { id: 38, name: "Ninetales", slug: "ninetales", type: "fire", say: "nine tails", facts: [
    "Nine long tails fan out around this elegant fox.",
    "A cream fox with nine long tails.",
    "The tails fan out like a golden cape.",
    "It is said to live a very long time.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 20 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Ninetales in Riddle Me This.",
    "It grew up from Vulpix.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a9/PE08_-_Feunard.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d2/SL042_-_Feunard_du_laboratoire_du_Prof._Chen.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/ninetales.jpg" },
  ] },
  { id: 39, name: "Jigglypuff", slug: "jigglypuff", type: "normal", say: "jig lee puff", facts: [
    "This round singer can puff up big like a balloon.",
    "A round pink body and huge green eyes.",
    "It sings into a little microphone it holds.",
    "It can puff up big, then slowly shrink again.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 5.5 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Jigglypuff first shows up in The Song of Jigglypuff.",
    "It grows up from Igglybuff, and it can still grow into Wigglytuff.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/ca/Rondoudou_de_Mitch_Mitchum.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/db/Rondoudou_de_Dresseur_-_Film_20.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/jigglypuff.jpg" },
  ] },
  { id: 40, name: "Wigglytuff", slug: "wigglytuff", type: "normal", say: "wig lee tuff", facts: [
    "Huge eyes shine on a very round, very soft body.",
    "A very round body and long rabbit-like ears.",
    "The big eyes shine when it is happy.",
    "Its body is so soft it can bounce.",
    "From head to toe it is about 1 meter.",
    "It weighs about 12 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Wigglytuff in A Battle of Aerial Mobility!.",
    "It grew up from Jigglypuff.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b4/Grodoudou_de_l%27Infirmi%C3%A8re_Jo%C3%ABlle_Film_18.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/41/Grodoudou_de_Neesha_-_Film_22.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/wigglytuff.jpg" },
  ] },
  { id: 41, name: "Zubat", slug: "zubat", type: "poison", say: "zoo bat", facts: [
    "It hangs in dark caves and listens with big ears.",
    "A blue body, big ears, and no eyes.",
    "It hangs upside down in dark caves.",
    "It listens, because it cannot see.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 7.5 kilograms.",
    "It lives around dark caves.",
    "In the cartoon, Zubat first shows up in Clefairy and the Moon Stone.",
    "When it grows up, it can become Golbat.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/02/SL024_-_Nosferapti_de_Cello.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/38/Film_03_-_Nosferapti_de_Pierre.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/zubat.jpg" },
  ] },
  { id: 42, name: "Golbat", slug: "golbat", type: "poison", say: "goal bat", facts: [
    "Wide wings and four fangs help it fly at night.",
    "Huge fangs and wide purple wings.",
    "It flies at night to look for food.",
    "Four fangs show when its mouth opens.",
    "From head to toe it is about 1.6 meters.",
    "It weighs about 55 kilograms.",
    "It lives around dark caves.",
    "In the cartoon, Golbat first shows up in The Ninja Poké-Showdown.",
    "It grows up from Zubat, and it can still grow into Crobat.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/54/Nosferalto_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9d/Nosferalto_Coupe-Vent.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/golbat.jpg" },
  ] },
  { id: 43, name: "Oddish", slug: "oddish", type: "grass", say: "odd ish", facts: [
    "Green leaves sprout from the top of its head.",
    "A blue body with green leaves on its head.",
    "It plants its feet and naps in the day.",
    "At night it walks around on those leaves.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 5.4 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Oddish first shows up in Bulbasaur and the Hidden Village.",
    "When it grows up, it can become Gloom.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/56/Mystherbe_sauvage_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b3/Mystherbe_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/oddish.jpg" },
  ] },
  { id: 44, name: "Gloom", slug: "gloom", type: "grass", say: "gloom", facts: [
    "A droopy flower on its head has a very strong smell.",
    "A droopy red-and-blue flower on its head.",
    "The smell from that flower is very strong.",
    "It droops more when it feels gloomy.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 8.6 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Gloom in Delibird's Dilemma.",
    "It grew up from Oddish, and it can still grow in more than one way.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a5/LV094_-_Ortide_d%27Erika_%28Flash-back%29.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/87/Ortide_sauvage_-_Film_20.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/gloom.jpg" },
  ] },
  { id: 45, name: "Vileplume", slug: "vileplume", type: "grass", say: "vile plume", facts: [
    "A huge red flower blooms right on top of its head.",
    "A huge red flower covers most of its head.",
    "It walks on two legs under that big bloom.",
    "The flower is the largest in this plant family.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 19 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Vileplume in Holy Matrimony!.",
    "It grew up from Gloom.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/82/LH094_-_Rafflesia_Giga-Sangsue.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2d/Rafflesia_de_la_Team_Rocket.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/vileplume.jpg" },
  ] },
  { id: 46, name: "Paras", slug: "paras", type: "bug", say: "pair us", facts: [
    "Two little mushrooms grow on this bug's back.",
    "An orange bug with two mushrooms on its back.",
    "The mushrooms and the bug help each other.",
    "It stays low in damp, shady places.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 5.4 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Paras in The Problem with Paras.",
    "When it grows up, it can become Parasect.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/96/LH150_-_Paras_du_Professeur_Willow.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/30/Film_02_-_Paras_du_Labo.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/paras.jpg" },
  ] },
  { id: 47, name: "Parasect", slug: "parasect", type: "bug", say: "para sekt", facts: [
    "A giant mushroom sits where this bug's back should be.",
    "A giant mushroom covers almost its whole back.",
    "The mushroom is so big the bug looks small.",
    "It still has little claws under that cap.",
    "From head to toe it is about 1 meter.",
    "It weighs about 30 kilograms.",
    "It lives around the woods.",
    "In the cartoon, Parasect first shows up in The Problem with Paras.",
    "It grew up from Paras.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/1b/Parasect_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/8e/Parasect_de_Dresseur_-_Film_21.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/parasect.jpg" },
  ] },
  { id: 48, name: "Venonat", slug: "venonat", type: "bug", say: "veh no nat", facts: [
    "Big round eyes glow in the dark like tiny lamps.",
    "A fuzzy purple body and huge round eyes.",
    "The eyes glow like lamps in the dark.",
    "Fine hair covers it from head to foot.",
    "From head to toe it is about 1 meter.",
    "It weighs about 30 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Venonat in The Lost Lapras.",
    "When it grows up, it can become Venomoth.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d2/Mimitoss_Poudre_Toxik.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/55/Mimitoss_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/venonat.jpg" },
  ] },
  { id: 49, name: "Venomoth", slug: "venomoth", type: "bug", say: "veh no moth", facts: [
    "Its dusty wings can shake out an itchy powder.",
    "Light wings with a dusty look.",
    "It flaps and shakes itchy powder into the air.",
    "Those big eyes still glow at night.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 12 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Venomoth in Working My Way Back to Mew!.",
    "It grew up from Venonat.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/21/A%C3%A9romite_de_Jacky.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/77/A%C3%A9romite_Entrave.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/venomoth.jpg" },
  ] },
  { id: 50, name: "Diglett", slug: "diglett", type: "ground", say: "dig let", facts: [
    "Only its head pops up out of a hole in the dirt.",
    "A brown head, a pink nose, and no visible body.",
    "It pops out of the dirt, then ducks back down.",
    "The rest of it stays hidden in the hole.",
    "From head to toe it is about 20 centimeters.",
    "It is light, about 800 grams.",
    "It lives around dark caves.",
    "In the cartoon, Diglett first shows up in Dig Those Diglett!.",
    "When it grows up, it can become Dugtrio.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c0/DP126_-_Taupiqueur_d%27un_Dresseur.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/98/Taupiqueur_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/diglett.jpg" },
  ] },
  { id: 51, name: "Dugtrio", slug: "dugtrio", type: "ground", say: "dug, tree oh", facts: [
    "Three heads pop out of one hole in the ground.",
    "Three heads share one hole in the ground.",
    "Each head can look a different way.",
    "They dig together as a team.",
    "From head to toe it is about 70 centimeters.",
    "It weighs about 33 kilograms.",
    "It lives around dark caves.",
    "In the cartoon, you can spot Dugtrio in Dig Those Diglett!.",
    "It grew up from Diglett.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/36/LH056_-_Triopikeur_de_Cayenn.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/83/Triopikeur_Tunnel.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/dugtrio.jpg" },
  ] },
  { id: 52, name: "Meowth", slug: "meowth", type: "normal", say: "mee, owth", facts: [
    "This cat walks on two feet and loves shiny coins.",
    "Cream fur, whiskers, and a coin on its forehead.",
    "It walks on two feet like a little person.",
    "It likes round, shiny coins.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 4.2 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, you can spot Meowth in Pokémon Emergency!.",
    "When it grows up, it can become Persian or another grown-up form.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/ab/LV095_-_Miaouss_Team_Rocket.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/82/LV094_-_Miaouss_Team_Rocket.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/meowth.jpg" },
  ] },
  { id: 53, name: "Persian", slug: "persian", type: "normal", say: "per zhun", facts: [
    "A red jewel shines in the middle of its forehead.",
    "A sleek cream body and a red jewel on its head.",
    "Long whiskers fan out from its cheeks.",
    "It walks proudly with its head high.",
    "From head to toe it is about 1 meter.",
    "It weighs about 32 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, you can spot Persian in Battle Aboard the St. Anne.",
    "It grew up from Meowth.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/6e/LV095_-_Persian_-_Flashback.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a9/Film_01_-_Persian_de_Giovanni.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/persian.jpg" },
  ] },
  { id: 54, name: "Psyduck", slug: "psyduck", type: "water", say: "sigh duck", facts: [
    "It holds its head when a headache makes it dizzy.",
    "A yellow duck with a blank, worried face.",
    "It grabs its head when the headache starts.",
    "Empty eyes mean it is feeling dizzy.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 20 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, Psyduck first shows up in Hypno's Naptime.",
    "When it grows up, it can become Golduck.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/56/LV096_-_Psykokwak_d%27un_Dresseur.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d8/Psykokwak_de_Matty_Crow.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/psyduck.jpg" },
  ] },
  { id: 55, name: "Golduck", slug: "golduck", type: "water", say: "goal duck", facts: [
    "A red gem on its forehead glows while it swims.",
    "A blue duck with webbed hands and a red gem.",
    "The gem glows while it swims fast.",
    "It is much quicker in the water than it looks.",
    "From head to toe it is about 1.7 meters.",
    "It weighs about 77 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, Golduck first shows up in Mewtwo Strikes Back.",
    "It grew up from Psyduck.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a2/LH005_-_Akwakwak_d%27Onia.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/63/LH022_-_Akwakwak.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/golduck.jpg" },
  ] },
  { id: 56, name: "Mankey", slug: "mankey", type: "fighting", say: "man key", facts: [
    "This monkey gets grumpy and swings a long tail.",
    "A pig-like nose and a long curling tail.",
    "It gets grumpy fast and jumps around.",
    "The tail helps it balance while it swings.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 28 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Mankey in Primeape Goes Bananas.",
    "When it grows up, it can become Primeape.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/ba/F%C3%A9rosinge_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b7/F%C3%A9rosinge_Mania.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/mankey.jpg" },
  ] },
  { id: 57, name: "Primeape", slug: "primeape", type: "fighting", say: "prime ape", facts: [
    "It stomps the ground and shows a pig-like snout.",
    "A pig snout and bands around its arms.",
    "It stomps and pants when it is angry.",
    "It stays mad longer than the little monkey.",
    "From head to toe it is about 1 meter.",
    "It weighs about 32 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, Primeape first shows up in Primeape Goes Bananas.",
    "It grows up from Mankey, and it can still grow into Annihilape.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/da/SL130_-_Colossinge_d%27un_Dresseur_%28Flash-back%29.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3e/Colossinge_sauvages_-_Film_20.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/primeape.jpg" },
  ] },
  { id: 58, name: "Growlithe", slug: "growlithe", type: "fire", say: "growl ith", facts: [
    "Stripes and a fluffy mane make this puppy look brave.",
    "Orange fur, black stripes, and a fluffy mane.",
    "It barks and guards the friends it trusts.",
    "The stripes make this puppy look like a tiny tiger.",
    "From head to toe it is about 70 centimeters.",
    "It weighs about 19 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Growlithe in Holy Matrimony!.",
    "When it grows up, it can become Arcanine.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/5d/Caninos_Puissance_Cach%C3%A9e.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/65/Caninos_d%27un_Dresseur_Film_20.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/growlithe.jpg" },
  ] },
  { id: 59, name: "Arcanine", slug: "arcanine", type: "fire", say: "are kuh nine", facts: [
    "A big mane and fast legs make this dog look proud.",
    "A huge mane, stripes, and very fast legs.",
    "It can race so quickly the ground shakes.",
    "This proud dog grew up from the striped puppy.",
    "From head to toe it is about 1.9 meters.",
    "It weighs about 155 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Arcanine first shows up in The Battle Of The Badge.",
    "It grew up from Growlithe.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/da/Arcanin_de_R%C3%A9gis.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fe/LH003_-_Arcanin.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/arcanine.jpg" },
  ] },
  { id: 60, name: "Poliwag", slug: "poliwag", type: "water", say: "paul lee wag", facts: [
    "A swirl on its round belly shows through its skin.",
    "A round tadpole body with a black-and-white swirl.",
    "The swirl on its belly shows through the skin.",
    "Its tail helps it wiggle through the water.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 12 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Poliwag in The Stun Spore Detour.",
    "When it grows up, it can become Poliwhirl.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e7/T%C3%AAtarte_Ptitard_film_9.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/70/Ptitard_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/poliwag.jpg" },
  ] },
  { id: 61, name: "Poliwhirl", slug: "poliwhirl", type: "water", say: "paul lee whirl", facts: [
    "It stands up, and the swirl on its belly keeps spinning.",
    "White gloves and a swirl on a blue belly.",
    "It can live in the water or hop on land.",
    "The swirl keeps spinning as it grows.",
    "From head to toe it is about 1 meter.",
    "It weighs about 20 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Poliwhirl in The Totodile Duel.",
    "It grew up from Poliwag, and it can still grow in more than one way.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e1/T%C3%AAtarte_de_Dresseur_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e7/T%C3%AAtarte_Ptitard_film_9.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/poliwhirl.jpg" },
  ] },
  { id: 62, name: "Poliwrath", slug: "poliwrath", type: "water", say: "paul lee rath", facts: [
    "Strong arms spin along with the swirl on its belly.",
    "Big muscles and fists, plus the same belly swirl.",
    "It spins its arms when it swims hard.",
    "The swirl never leaves, even when it gets strong.",
    "From head to toe it is about 1.3 meters.",
    "It weighs about 54 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Poliwrath in Charizard Chills.",
    "It grew up from Poliwhirl.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0c/Tartard_Direct_Toxik.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/97/Tartard_d%27Andr%C3%A9as.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/poliwrath.jpg" },
  ] },
  { id: 63, name: "Abra", slug: "abra", type: "psychic", say: "ab ra", facts: [
    "It sleeps almost all day, then pops somewhere else.",
    "A yellow body and eyes that stay shut.",
    "It naps all day, then pops to a new spot.",
    "It would rather sleep than walk.",
    "From head to toe it is about 90 centimeters.",
    "It weighs about 20 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, one grows and changes during Abra and the Psychic Showdown.",
    "When it grows up, it can become Kadabra.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/73/Abra_sauvage_-_Film_20_Intro_.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/eb/Abra_Rune_Protect.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/abra.jpg" },
  ] },
  { id: 64, name: "Kadabra", slug: "kadabra", type: "psychic", say: "kuh, dab ra", facts: [
    "A spoon floats beside it while it thinks very hard.",
    "A mustache, a star on its head, and a spoon.",
    "The spoon floats while it thinks.",
    "It stands on two legs and stares hard.",
    "From head to toe it is about 1.3 meters.",
    "It weighs about 56 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Kadabra first shows up in Abra and the Psychic Showdown.",
    "It grows up from Abra, and it can still grow into Alakazam.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d2/Kadabra_T%C3%A9l%C3%A9port.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/04/Kadabra_Choc_Mental.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/kadabra.jpg" },
  ] },
  { id: 65, name: "Alakazam", slug: "alakazam", type: "psychic", say: "al uh kuh, zam", facts: [
    "It holds a spoon in each hand and thinks super fast.",
    "A thin body, a mustache, and a spoon in each hand.",
    "Both spoons can float while it concentrates.",
    "It thinks faster than almost any other Pokémon.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 48 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Alakazam first shows up in The Ancient Puzzle of Pokémopolis.",
    "It grew up from Kadabra.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/5b/Film_01_-_Adversaire_de_Giovanni_-_Alakazam_d%27un_dresseur.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/1a/Alakazam_Entrave.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/alakazam.jpg" },
  ] },
  { id: 66, name: "Machop", slug: "machop", type: "fighting", say: "muh, chop", facts: [
    "This little fighter practices punches every day.",
    "A small gray body with ridges on its head.",
    "It lifts and punches to practice every day.",
    "Even little muscles get stronger with work.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 20 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Machop in Pop Goes The Sneasel.",
    "When it grows up, it can become Machoke.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/da/AC02_-_Machoc.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/ef/Machoc_de_Dresseur_-_Film_20.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/machop.jpg" },
  ] },
  { id: 67, name: "Machoke", slug: "machoke", type: "fighting", say: "muh, choke", facts: [
    "A belt around its waist helps it lift heavy things.",
    "A blue-gray body and a belt at its waist.",
    "The belt helps it lift very heavy things.",
    "It is the middle step of the punching family.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 70 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Machoke in Chikorita's Big Upset.",
    "It grows up from Machop, and it can still grow into Machamp.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/99/Machopeur_de_Dresseur_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/26/AC02_-_Machopeur.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/machoke.jpg" },
  ] },
  { id: 68, name: "Machamp", slug: "machamp", type: "fighting", say: "muh, champ", facts: [
    "Four strong arms can throw a whole bunch of punches.",
    "Four arms and a champion belt.",
    "It can throw punches from every side at once.",
    "Four arms means it never needs to turn around to hit.",
    "From head to toe it is about 1.6 meters.",
    "It weighs about 130 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Machamp in The Battle of the Badge.",
    "It grew up from Machoke.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/39/Mackogneur_de_Raymond_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/28/LV092_-_Mackogneur_de_Fa%C3%AFza.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/machamp.jpg" },
  ] },
  { id: 69, name: "Bellsprout", slug: "bellsprout", type: "grass", say: "bell sprout", facts: [
    "Its thin green body bends like a little plant bell.",
    "A yellow bell body with roots for feet.",
    "It bends and sways like a plant in the wind.",
    "The leaves on its head look like a bud.",
    "From head to toe it is about 70 centimeters.",
    "It weighs about 4 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Bellsprout in The Fourth Round Rumble.",
    "When it grows up, it can become Weepinbell.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/53/Ch%C3%A9tiflor_de_Dresseur_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/91/Ch%C3%A9tiflor_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/bellsprout.jpg" },
  ] },
  { id: 70, name: "Weepinbell", slug: "weepinbell", type: "grass", say: "wee pin bell", facts: [
    "Two leafy bells hang down where its mouth should be.",
    "A green leafy bell with two dangling parts.",
    "It hangs and waits, then snaps at food.",
    "The leaves hide a mouth underneath.",
    "From head to toe it is about 1 meter.",
    "It weighs about 6.4 kilograms.",
    "It lives around the woods.",
    "In the cartoon, one grows and changes during Here's Lookin' at You, Elekid.",
    "It grows up from Bellsprout, and it can still grow into Victreebel.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/1d/Boustiflor_d%27Amaro.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2f/Boustiflor_N%C5%93ud_Herbe.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/weepinbell.jpg" },
  ] },
  { id: 71, name: "Victreebel", slug: "victreebel", type: "grass", say: "vick tree bell", facts: [
    "A big leafy mouth can snap shut like a plant trap.",
    "A tall plant with a huge open mouth.",
    "A long vine can pull food toward that mouth.",
    "The mouth snaps shut like a trap.",
    "From head to toe it is about 1.7 meters.",
    "It weighs about 16 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Victreebel in Here's Lookin' at You, Elekid.",
    "It grew up from Weepinbell.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/81/PE08_-_Empiflor.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/78/Film_04_%26_05_-_Intro_-_Empiflor_Sauvage.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/victreebel.jpg" },
  ] },
  { id: 72, name: "Tentacool", slug: "tentacool", type: "water", say: "ten ta cool", facts: [
    "Two shiny eyes glow on this floating water blob.",
    "A blue blob with two red gems for eyes.",
    "It floats in the sea and trails two arms.",
    "The gems glow under the water.",
    "From head to toe it is about 90 centimeters.",
    "It weighs about 46 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, you can spot Tentacool in Tentacool and Tentacruel.",
    "When it grows up, it can become Tentacruel.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/55/Tentacool_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/cb/Tentacool_%C3%89cume.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/tentacool.jpg" },
  ] },
  { id: 73, name: "Tentacruel", slug: "tentacruel", type: "water", say: "ten ta cruel", facts: [
    "Lots of long arms trail under its red body.",
    "A red body with many long blue arms.",
    "The arms can sting as they drift.",
    "It has far more arms than the little blob.",
    "From head to toe it is about 1.6 meters.",
    "It weighs about 55 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, you can spot Tentacruel in Tentacool & Tentacruel.",
    "It grew up from Tentacool.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/05/Tentacruel_%C3%89treinte.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d2/Tentacruel_Direct_Toxik.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/tentacruel.jpg" },
  ] },
  { id: 74, name: "Geodude", slug: "geodude", type: "rock", say: "gee oh dude", facts: [
    "This round rock has arms and a grumpy stony face.",
    "A round rock with arms and a rocky face.",
    "It looks grumpy even when it is still.",
    "The arms are made of the same stone as its body.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 20 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Geodude in Showdown in Pewter City.",
    "When it grows up, it can become Graveler.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/ae/Racaillou_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/ce/PO01_-_Racaillou_de_Pierre.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/geodude.jpg" },
  ] },
  { id: 75, name: "Graveler", slug: "graveler", type: "rock", say: "grav el ler", facts: [
    "Four rocky arms help it roll down a hill.",
    "Four rocky arms and a lumpy stone body.",
    "It rolls down hills when it wants to move fast.",
    "Extra arms help it climb as well as roll.",
    "From head to toe it is about 1 meter.",
    "It weighs about 105 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, Graveler first shows up in The School of Hard Knocks.",
    "It grows up from Geodude, and it can still grow into Golem.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/4f/Gravalanch_Film_18_Flashback.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/65/Gravalanch_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/graveler.jpg" },
  ] },
  { id: 76, name: "Golem", slug: "golem", type: "rock", say: "go lum", facts: [
    "A heavy rocky shell covers almost its whole body.",
    "A huge round shell of rock.",
    "It can pull its head and arms inside.",
    "The shell is so heavy it shakes the ground.",
    "From head to toe it is about 1.4 meters.",
    "It weighs about 300 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, Golem first shows up in The Bridge Bike Gang.",
    "It grew up from Graveler.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/78/LH149_-_Grolem_Explosion.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/de/Grolem_Bulldoboule.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/golem.jpg" },
  ] },
  { id: 77, name: "Ponyta", slug: "ponyta", type: "fire", say: "poh nee tah", facts: [
    "Little flames flicker in this horse's mane.",
    "A small horse with flames in its mane and tail.",
    "The fire does not burn its own hair.",
    "Its hooves can leave warm prints behind.",
    "From head to toe it is about 1 meter.",
    "It weighs about 30 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Ponyta first shows up in The Flame Pokémon-athon!.",
    "When it grows up, it can become Rapidash.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fd/LV055_-_Ponyta_de_Galar_Pok%C3%A9dex.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b1/Chronicles_01_Noel_-_Ponyta_du_P%C3%A8re_Noel.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/ponyta.jpg" },
  ] },
  { id: 78, name: "Rapidash", slug: "rapidash", type: "fire", say: "rapid dash", facts: [
    "A fiery mane streams back when it gallops.",
    "A horn and a mane made of streaming fire.",
    "It gallops so fast it is hard to follow.",
    "The fiery mane stretches out in the wind.",
    "From head to toe it is about 1.7 meters.",
    "It weighs about 95 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Rapidash first shows up in The Flame Pokémon-athon!.",
    "It grew up from Ponyta.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d6/PE08_-_Galopa.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7c/Film_08_-_Intro_-_Galopa_d%27un_Dresseur.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/rapidash.jpg" },
  ] },
  { id: 79, name: "Slowpoke", slug: "slowpoke", type: "water", say: "slow poke", facts: [
    "It stares into space and takes a long time to notice you.",
    "A pink body, a dopey smile, and a long tail.",
    "It stares at the water and forgets what it was doing.",
    "It is happy to sit still for a long time.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 36 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Slowpoke in The Evolution Solution.",
    "When it grows up, it can become Slowbro or another grown-up form.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/31/LV097_-_Ramoloss_sauvages.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/76/Ramoloss_B%C3%A2illement.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/slowpoke.jpg" },
  ] },
  { id: 80, name: "Slowbro", slug: "slowbro", type: "water", say: "slow bro", facts: [
    "A shell clamps onto its tail and will not let go.",
    "A pink body with a shell clamped on its tail.",
    "The shell bites down and will not let go.",
    "It fishes with that tail still attached.",
    "From head to toe it is about 1.6 meters.",
    "It weighs about 78 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Slowbro in The Evolution Solution.",
    "It grew up from Slowpoke.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c1/LV097_-_Flagadoss.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/6b/LH112_-_Flagadoss_Hydrocanon.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/slowbro.jpg" },
  ] },
  { id: 81, name: "Magnemite", slug: "magnemite", type: "electric", say: "mag nuh mite", facts: [
    "Screws on its sides pull it toward anything metal.",
    "A metal eye with a screw on each side.",
    "It floats and sticks to magnets and metal.",
    "The screws spin when it is pulling hard.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 6 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, you can spot Magnemite in Clemont's Got a Secret!.",
    "When it grows up, it can become Magneton.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/8e/Magn%C3%A9ti_de_Ren.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9f/Ma%C3%AEtre_des_Mirages_-_Magn%C3%A9ti_mirage_du_Docteur_Yung.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/magnemite.jpg" },
  ] },
  { id: 82, name: "Magneton", slug: "magneton", type: "electric", say: "mag nuh ton", facts: [
    "Three magnets snap together into one buzzing body.",
    "Three round magnets locked into one body.",
    "It floats and buzzes with electricity.",
    "Each piece still has its own eye.",
    "From head to toe it is about 1 meter.",
    "It weighs about 60 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, you can spot Magneton in Clemont's Got a Secret!.",
    "It grows up from Magnemite, and it can still grow into Magnezone.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/85/LH012_-_Magn%C3%A9ton_de_Spinel.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3d/LH013_-_9_Magn%C3%A9ton_de_Spinel.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/magneton.jpg" },
  ] },
  { id: 83, name: "Farfetch’d", slug: "farfetchd", type: "normal", say: "far fetched", facts: [
    "It carries a long green onion like a little sword.",
    "A brown duck holding a long green onion.",
    "It carries that onion everywhere like a sword.",
    "It will not let go of its favorite stalk.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 15 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Farfetch’d in Dreams Are Made of These!.",
    "When it grows up, it can become Sirfetch'd.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9f/Canarticho_Reflet.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/46/Canarticho_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/farfetchd.jpg" },
  ] },
  { id: 84, name: "Doduo", slug: "doduo", type: "normal", say: "doe, doo oh", facts: [
    "Two heads share one speedy bird body.",
    "Two heads on one tall, skinny bird.",
    "Both heads can peck while the legs run.",
    "It is fast even with two necks to balance.",
    "From head to toe it is about 1.4 meters.",
    "It weighs about 39 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Doduo in Bad To The Bone.",
    "When it grows up, it can become Dodrio.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d8/Bulbizarre_et_Doduo_de_Dresseurs_-_Film_21.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e1/Pok%C3%A9mon_M%C3%A9ga-%C3%89volution_2_-_Doduo_et_Bagga%C3%AFd_de_Dresseurs.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/doduo.jpg" },
  ] },
  { id: 85, name: "Dodrio", slug: "dodrio", type: "normal", say: "doe, dree oh", facts: [
    "Three heads can look three different ways at once.",
    "Three heads on one set of long legs.",
    "Each head can watch a different direction.",
    "Three beaks can peck one after another.",
    "From head to toe it is about 1.8 meters.",
    "It weighs about 85 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Dodrio in The Flame Pokémon-athon!.",
    "It grew up from Doduo.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/04/Dodrio_d%27une_Dresseuse_Film_9_Intro.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b4/Dodrio_Bec_Vrille.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/dodrio.jpg" },
  ] },
  { id: 86, name: "Seel", slug: "seel", type: "water", say: "seal", facts: [
    "This white sea pup has a little horn on its head.",
    "A white body, flippers, and a little horn.",
    "It slides across ice and swims in cold water.",
    "The horn is small now and grows later.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 90 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, you can spot Seel in The Water Flowers of Cerulean City.",
    "When it grows up, it can become Dewgong.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/44/Otaria_sauvage_-_Film_20_Intro_.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/89/Otaria_Coup_d%27Boule.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/seel.jpg" },
  ] },
  { id: 87, name: "Dewgong", slug: "dewgong", type: "water", say: "doo gong", facts: [
    "A long white body glides through icy water.",
    "A long white body with a horn on its head.",
    "It glides under the ice without a splash.",
    "It is the grown-up form of the little sea pup.",
    "From head to toe it is about 1.7 meters.",
    "It weighs about 120 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, one grows and changes during The Misty Mermaid.",
    "It grew up from Seel.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/61/Clone_de_Lamantine_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/12/LV015_-_Lamantine_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/dewgong.jpg" },
  ] },
  { id: 88, name: "Grimer", slug: "grimer", type: "poison", say: "grime ur", facts: [
    "This purple blob oozes slowly along the ground.",
    "A purple sludge body with two arms.",
    "It oozes along and leaves a sticky trail.",
    "The sludge can squeeze through small gaps.",
    "From head to toe it is about 90 centimeters.",
    "It weighs about 30 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, you can spot Grimer in Dreams Are Made of These!.",
    "When it grows up, it can become Muk.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/36/Tadmorv_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3b/Tadmorv_D%C3%A9tritus.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/grimer.jpg" },
  ] },
  { id: 89, name: "Muk", slug: "muk", type: "poison", say: "muck", facts: [
    "A bigger gooey blob leaves a sticky trail behind it.",
    "A bigger purple sludge with a wide mouth.",
    "It slumps forward and leaves a stinky path.",
    "Anything it touches can get sticky.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 30 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Muk first shows up in Sparks Fly for Magnemite.",
    "It grew up from Grimer.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/07/BA_N2B2_-_Magn%C3%A9ti_et_Grotadmorv_de_Sbires_Plasma.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/cf/Grotadmorv_Bombe_Beurk.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/muk.jpg" },
  ] },
  { id: 90, name: "Shellder", slug: "shellder", type: "water", say: "shell der", facts: [
    "Its two shells can clamp shut just like a clam.",
    "Two shells and a tongue poking out.",
    "It clamps shut like a clam when it is scared.",
    "A pearl can hide inside the shell.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 4 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, you can spot Shellder in The Evolution Solution.",
    "When it grows up, it can become Cloyster.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c1/LH150_-_Kokiyas_du_Professeur_Willow.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/8c/Kokiyas_Saumure.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/shellder.jpg" },
  ] },
  { id: 91, name: "Cloyster", slug: "cloyster", type: "water", say: "cloy ster", facts: [
    "A spiky shell stays shut tight until it wants to bite.",
    "A round shell covered in sharp spikes.",
    "It stays shut until it wants to bite.",
    "The spikes make it hard to pick up.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 132 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, you can spot Cloyster in The Mandarin Island Miss Match.",
    "It grew up from Shellder.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c0/Crustabri_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/27/Crustabri_film_9.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/cloyster.jpg" },
  ] },
  { id: 92, name: "Gastly", slug: "gastly", type: "ghost", say: "gast lee", facts: [
    "A spooky face peeks out of a purple cloud of gas.",
    "A purple cloud with a spooky face inside.",
    "It floats and can slip through a wall.",
    "The gas is the whole Pokémon.",
    "From head to toe it is about 1.3 meters.",
    "It is light, about 100 grams.",
    "It lives around dark caves.",
    "In the cartoon, Gastly first shows up in The Ghost of Maiden's Peak.",
    "When it grows up, it can become Haunter.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f1/LV090_-_Fantominus_et_Minidraco_de_Sacha.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e0/Mini-Film_07_-_Fantominus.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/gastly.jpg" },
  ] },
  { id: 93, name: "Haunter", slug: "haunter", type: "ghost", say: "haunt ur", facts: [
    "It floats along with a big grin and ghostly hands.",
    "A gas body, a big grin, and floating hands.",
    "It reaches out with hands that are not solid.",
    "The tongue sticks out when it is teasing.",
    "From head to toe it is about 1.6 meters.",
    "It is light, about 100 grams.",
    "It lives around dark caves.",
    "In the cartoon, you can spot Haunter in The Tower of Terror.",
    "It grows up from Gastly, and it can still grow into Gengar.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/00/LV090_-_Spectrum_et_Draco_de_Sacha.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/73/Spectrum_Onde_Folie.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/haunter.jpg" },
  ] },
  { id: 94, name: "Gengar", slug: "gengar", type: "ghost", say: "geng gar", facts: [
    "A wide spooky smile glows when the lights go out.",
    "A round shadow with spikes on its back.",
    "Its wide smile shows up in the dark.",
    "It hides, then pops out to surprise someone.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 40 kilograms.",
    "It lives around dark caves.",
    "In the cartoon, you can spot Gengar in Volcanion and the Mechanical Marvel.",
    "It grew up from Haunter.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f5/LV099_-_Ectoplasma_de_Sacha.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/8d/Ectoplasma_Larcin.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/gengar.jpg" },
  ] },
  { id: 95, name: "Onix", slug: "onix", type: "rock", say: "on icks", facts: [
    "This long rock snake digs deep tunnels underground.",
    "A long body made of round gray boulders.",
    "A horn sticks out from its rocky head.",
    "It digs tunnels by pushing through the ground.",
    "From head to toe it is about 8.8 meters.",
    "It weighs about 210 kilograms.",
    "It lives around dark caves.",
    "In the cartoon, you can spot Onix in Showdown in Pewter City.",
    "When it grows up, it can become Steelix.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a4/Onix_de_Dresseur_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/51/Onix_de_Matty_Crow.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/onix.jpg" },
  ] },
  { id: 96, name: "Drowzee", slug: "drowzee", type: "psychic", say: "drow zee", facts: [
    "Its long nose swings while it daydreams.",
    "A yellow body and a long tapir nose.",
    "The nose swings while it dreams.",
    "It likes naps as much as it likes tricks.",
    "From head to toe it is about 1 meter.",
    "It weighs about 32 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Drowzee first shows up in Hypno's Naptime.",
    "When it grows up, it can become Hypno.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e4/Soporifik_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3e/Soporifik_Psykoud%27Boul.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/drowzee.jpg" },
  ] },
  { id: 97, name: "Hypno", slug: "hypno", type: "psychic", say: "hip no", facts: [
    "A swinging pendulum makes sleepy eyes even sleepier.",
    "A pendulum swings from one hand.",
    "Its eyes look heavy and sleepy.",
    "The swinging charm makes others drowsy.",
    "From head to toe it is about 1.6 meters.",
    "It weighs about 76 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, one grows and changes during Hypno's Naptime.",
    "It grew up from Drowzee.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/40/Hypnomade_de_Saubohne.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7e/Hypnomade_D%C3%A9vor%C3%AAve.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/hypno.jpg" },
  ] },
  { id: 98, name: "Krabby", slug: "krabby", type: "water", say: "krab ee", facts: [
    "One claw is much bigger and pinches much harder.",
    "A small crab with one claw much bigger.",
    "The big claw pinches harder than the little one.",
    "It walks sideways on the beach.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 6.5 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Krabby in Mystery at the Lighthouse.",
    "When it grows up, it can become Kingler.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2a/Krabby_Stari_film_9.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e1/Krabby_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/krabby.jpg" },
  ] },
  { id: 99, name: "Kingler", slug: "kingler", type: "water", say: "king ler", facts: [
    "A giant claw can pinch something as big as a coconut.",
    "One claw is giant and the other is small.",
    "The big claw is strong enough to crack a coconut.",
    "It is proud of that oversized pinch.",
    "From head to toe it is about 1.3 meters.",
    "It weighs about 60 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Kingler in Round One - Begin!.",
    "It grew up from Krabby.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f7/Krabboss_de_Sacha.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e4/Krabboss_de_la_Team_Rocket.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/kingler.jpg" },
  ] },
  { id: 100, name: "Voltorb", slug: "voltorb", type: "electric", say: "volt orb", facts: [
    "It looks like a round toy ball that can suddenly zap.",
    "A red-and-white ball with a face.",
    "It looks like a toy, then suddenly zaps.",
    "It rolls instead of walking.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 10 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, you can spot Voltorb in The Ninja Poké-Showdown.",
    "When it grows up, it can become Electrode.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3c/LV081_-_Voltorbe_Destruction.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/ae/Voltorbe_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/voltorb.jpg" },
  ] },
  { id: 101, name: "Electrode", slug: "electrode", type: "electric", say: "ee, leck trode", facts: [
    "This ball rolls around, then pops with electricity.",
    "A ball with the colors flipped from the little one.",
    "It rolls fast, then pops with electricity.",
    "The face is upside down compared with Voltorb.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 67 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, you can spot Electrode in Navel Maneuvers.",
    "It grew up from Voltorb.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2d/LH135_-_%C3%89lectrode.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2a/%C3%89lectrode_Boom_Final.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/electrode.jpg" },
  ] },
  { id: 102, name: "Exeggcute", slug: "exeggcute", type: "grass", say: "ex egg cute", facts: [
    "Six little eggs huddle together in a bunch.",
    "Six pink eggs huddled in a bunch.",
    "Each egg has its own little face.",
    "They have to stay together to get around.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 2.5 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Exeggcute in The March of the Exeggutor Squad.",
    "When it grows up, it can become Exeggutor.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/61/Noeunoeuf_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/ae/Noeunoeuf_sauvages_-_Film_23.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/exeggcute.jpg" },
  ] },
  { id: 103, name: "Exeggutor", slug: "exeggutor", type: "grass", say: "ex, egg uh tore", facts: [
    "Three coconut heads grow on one tall body.",
    "Three coconut heads on a tall brown body.",
    "Each head can look around on its own.",
    "It stands like a palm tree that can walk.",
    "From head to toe it is about 2 meters.",
    "It weighs about 120 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Exeggutor in Partner Promises!.",
    "It grew up from Exeggcute.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/87/Noadkoko_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2e/Noadkoko_de_Blue.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/exeggutor.jpg" },
  ] },
  { id: 104, name: "Cubone", slug: "cubone", type: "ground", say: "cue bone", facts: [
    "It wears a little bone helmet wherever it goes.",
    "A little cub wearing a bone as a helmet.",
    "It carries a bone club wherever it goes.",
    "The helmet hides its eyes.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 6.5 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Cubone in A Snow Day for Searching!.",
    "When it grows up, it can become Marowak.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fe/Osselait_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/69/PO02_-_Osselait_de_la_Maison_Pok%C3%A9mon.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/cubone.jpg" },
  ] },
  { id: 105, name: "Marowak", slug: "marowak", type: "ground", say: "mare oh wack", facts: [
    "It swings a long bone like a club.",
    "A bigger cub with a skull helmet and a bone club.",
    "It swings the bone when it wants space.",
    "The helmet is the same kind Cubone wears.",
    "From head to toe it is about 1 meter.",
    "It weighs about 45 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Marowak in A Crowning Moment of Truth!.",
    "It grew up from Cubone.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7b/Ossatueur_de_Luana.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/68/SL042_-_Ossatueur_du_laboratoire_du_Prof._Chen.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/marowak.jpg" },
  ] },
  { id: 106, name: "Hitmonlee", slug: "hitmonlee", type: "fighting", say: "hit mon, lee", facts: [
    "Springy legs can kick higher than its own head.",
    "Long springy legs and feet made for kicking.",
    "It can kick higher than its own head.",
    "The legs stretch out like rubber.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 50 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Hitmonlee first shows up in The Punchy Pokémon.",
    "It grew up from Tyrogue.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7c/Clone_de_Kicklee_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d2/Kicklee_Close_Combat.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/hitmonlee.jpg" },
  ] },
  { id: 107, name: "Hitmonchan", slug: "hitmonchan", type: "fighting", say: "hit mon, chan", facts: [
    "Fast fists punch like a tiny boxer.",
    "Red boxing gloves and a fighter's stance.",
    "Fast fists punch one after another.",
    "It hops like a tiny boxer.",
    "From head to toe it is about 1.4 meters.",
    "It weighs about 50 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Hitmonchan first shows up in The Punchy Pokémon.",
    "It grew up from Tyrogue.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/aa/Tygnon_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/4d/Tygnon_Mach_Punch.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/hitmonchan.jpg" },
  ] },
  { id: 108, name: "Lickitung", slug: "lickitung", type: "normal", say: "lick it tung", facts: [
    "A huge tongue can stretch way, way out.",
    "A pink body and a tongue longer than its arms.",
    "The tongue can stretch way out to grab a snack.",
    "It rolls its tongue up when it is done.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 66 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Lickitung first shows up in Princess vs. Princess.",
    "When it grows up, it can become Lickilicky.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/28/Kapoera_et_Excelangue_de_Dresseurs_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/21/Mini-Film_01_-_Excelangue_du_Parc.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/lickitung.jpg" },
  ] },
  { id: 109, name: "Koffing", slug: "koffing", type: "poison", say: "koff ing", facts: [
    "This round gas ball floats and puffs smelly air.",
    "A round purple body full of smelly gas.",
    "Skull marks show on its sides.",
    "It floats and puffs when it is bumped.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 1 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Koffing first shows up in Pokémon Emergency!.",
    "When it grows up, it can become Weezing.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0f/Smogo_Bain_de_Smog.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/70/Smogo_Bombe_Beurk.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/koffing.jpg" },
  ] },
  { id: 110, name: "Weezing", slug: "weezing", type: "poison", say: "weez ing", facts: [
    "Three smoky heads leak stinky puffs at once.",
    "Two big smoky heads stuck together.",
    "A smaller puff sits on the side.",
    "Both heads can leak stinky gas at once.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 9.5 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Weezing first shows up in Dig Those Diglett!.",
    "It grew up from Koffing.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b9/Smogogo_de_James_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/4b/PO03_-_Smogogo_de_Koga_%28Flash-Back%29.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/weezing.jpg" },
  ] },
  { id: 111, name: "Rhyhorn", slug: "rhyhorn", type: "ground", say: "rye horn", facts: [
    "A tough horn and rocky hide help it charge ahead.",
    "A gray body, rocky hide, and a drill horn.",
    "It charges straight ahead and is hard to stop.",
    "The hide feels like stone.",
    "From head to toe it is about 1 meter.",
    "It weighs about 115 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, you can spot Rhyhorn in Bulbasaur's Mysterious Garden.",
    "When it grows up, it can become Rhydon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fb/Film_17_-_Rhinocorne.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/83/Rhinocorne_d%27Alberto_-_Film_22.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/rhyhorn.jpg" },
  ] },
  { id: 112, name: "Rhydon", slug: "rhydon", type: "ground", say: "rye don", facts: [
    "A bigger horn can drill right through rock.",
    "It stands up, with a bigger horn and a thick tail.",
    "The horn can drill into rock.",
    "Its arms are strong enough to lift boulders.",
    "From head to toe it is about 1.9 meters.",
    "It weighs about 120 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, you can spot Rhydon in Riddle Me This.",
    "It grows up from Rhyhorn, and it can still grow into Rhyperior.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/20/LH001_-_Rhinof%C3%A9ros_de_Zirc.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/15/LH005_-_Rhinof%C3%A9ros_Boule_Roc.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/rhydon.jpg" },
  ] },
  { id: 113, name: "Chansey", slug: "chansey", type: "normal", say: "chan see", facts: [
    "A tiny egg rides safe in the pouch on its tummy.",
    "A pink oval body with a pouch in front.",
    "A tiny egg rides safe in that pouch.",
    "It shares eggs when it wants to be kind.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 35 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, you can spot Chansey in Pokémon Emergency!.",
    "It grows up from Happiny, and it can still grow into Blissey.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0b/Leveinard_de_l%27Infirmi%C3%A8re_Jo%C3%ABlle_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/8b/LH003_-_Leveinard_de_Mollie.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/chansey.jpg" },
  ] },
  { id: 114, name: "Tangela", slug: "tangela", type: "grass", say: "tang guh luh", facts: [
    "Blue vines cover it like a wiggly mop.",
    "Blue vines cover its whole body like a mop.",
    "Red shoes peek out under the vines.",
    "The vines wiggle even when it stands still.",
    "From head to toe it is about 1 meter.",
    "It weighs about 35 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Tangela first shows up in Pokémon Scent-sation!.",
    "When it grows up, it can become Tangrowth.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/90/Saquedeneu_de_l%27Agent_Jenny.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3a/Saquedeneu_d%27Erika_-_Film_20.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/tangela.jpg" },
  ] },
  { id: 115, name: "Kangaskhan", slug: "kangaskhan", type: "normal", say: "kang gas khan", facts: [
    "A baby peeks out of the pouch on its tummy.",
    "A big parent with a baby in a tummy pouch.",
    "The baby peeks out and rides along.",
    "It guards that baby with its whole body.",
    "From head to toe it is about 2.2 meters.",
    "It weighs about 80 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Kangaskhan first shows up in The Kangaskhan Kid.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d8/PE08_-_Ectoplasma_et_Kangourex.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/69/DJM_RisqueTout_-_Kangourex_de_la_R%C3%A9serve_Kangourex.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/kangaskhan.jpg" },
  ] },
  { id: 116, name: "Horsea", slug: "horsea", type: "water", say: "horse, see", facts: [
    "A curly tail pushes this little water dragon along.",
    "A tiny blue water dragon with a curly tail.",
    "It squirts ink when it wants to hide.",
    "The curled tail pushes it through the water.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 8 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, Horsea first shows up in Tentacool & Tentacruel.",
    "When it grows up, it can become Seadra.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b8/Hypotrempe_film_9.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9f/Film_01_-_Invit%C3%A9_-_Hypotrempe_de_dresseur.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/horsea.jpg" },
  ] },
  { id: 117, name: "Seadra", slug: "seadra", type: "water", say: "see druh", facts: [
    "Spiny fins and a long snout make it a fierce swimmer.",
    "Spiny fins and a long snout.",
    "It swims backward as well as forward.",
    "The spines make it prickly to grab.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 25 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, you can spot Seadra in Mewtwo Strikes Back.",
    "It grows up from Horsea, and it can still grow into Kingdra.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9e/Hypoc%C3%A9an_Hyporoi_film_9.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/19/PO03_-_Hypoc%C3%A9an_d%27un_Dresseur_%28Flash-Back%29.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/seadra.jpg" },
  ] },
  { id: 118, name: "Goldeen", slug: "goldeen", type: "water", say: "goal dean", facts: [
    "A horn on its head gleams like gold underwater.",
    "A gold horn and long flowing fins.",
    "It flutters those fins like a dress.",
    "The horn gleams under the water.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 15 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, Goldeen first shows up in Pokémon Emergency!.",
    "When it grows up, it can become Seaking.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7c/Poissir%C3%A8ne_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/5a/Poissir%C3%A8ne_Empal%27Korne.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/goldeen.jpg" },
  ] },
  { id: 119, name: "Seaking", slug: "seaking", type: "water", say: "see king", facts: [
    "A sharp horn and a strong tail power this fish.",
    "A bigger horn and a strong forked tail.",
    "It swims hard when it is guarding eggs.",
    "The horn is sharper than the little fish's horn.",
    "From head to toe it is about 1.3 meters.",
    "It weighs about 39 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Seaking in The Misty Mermaid.",
    "It grew up from Goldeen.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a7/Mini-Film_20_-_Poissoroy.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/65/Poissoroy_Empal%27Korne.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/seaking.jpg" },
  ] },
  { id: 120, name: "Staryu", slug: "staryu", type: "water", say: "star you", facts: [
    "A red gem glows in the middle of this sea star.",
    "Five arms and a red gem in the center.",
    "It spins through the water like a star.",
    "The gem glows at night.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 34 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, Staryu first shows up in Clefairy and the Moon Stone.",
    "When it grows up, it can become Starmie.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/6b/Stari_d%27Ondine_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2a/Krabby_Stari_film_9.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/staryu.jpg" },
  ] },
  { id: 121, name: "Starmie", slug: "starmie", type: "water", say: "star mee", facts: [
    "The gem in its center can sparkle many colors.",
    "Two stars, one on each side, and a bright core.",
    "The center gem can shine many colors.",
    "It spins even faster than the little star.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 80 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, Starmie first shows up in The Water Flowers of Cerulean City.",
    "It grew up from Staryu.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/48/LH121_-_Staross_de_Friede.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7b/LH122_-_Staross_de_Friede.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/starmie.jpg" },
  ] },
  { id: 122, name: "Mr. Mime", slug: "mrmime", type: "psychic", say: "mister, mime", facts: [
    "It can push the air and make an invisible wall.",
    "A white face, green hair, and pink cheeks.",
    "It mimes a wall you cannot see.",
    "Its fingers are always spread like a show.",
    "From head to toe it is about 1.3 meters.",
    "It weighs about 54 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, you can spot Mr. Mime in It's Mr. Mime Time.",
    "It grows up from Mime Jr., and it can still grow into Mr. Rime.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fa/M._Mime_Mitra-Poing.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/09/M._Mime_Protection.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/mr-mime.jpg" },
  ] },
  { id: 123, name: "Scyther", slug: "scyther", type: "bug", say: "sigh ther", facts: [
    "Sharp arm blades slice the air when it leaps.",
    "A green body and blades for arms.",
    "It leaps and slices the air with those blades.",
    "Wings on its back make the jump longer.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 56 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Scyther in Tracey Gets Bugged.",
    "When it grows up, it can become Scizor or another grown-up form.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a0/Clone_d%27Ins%C3%A9cateur_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3b/LH005_-_Ins%C3%A9cateur.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/scyther.jpg" },
  ] },
  { id: 124, name: "Jynx", slug: "jynx", type: "ice", say: "jinx", facts: [
    "It dances on the ice and sings a chilly song.",
    "Purple skin, blonde hair, and a red dress.",
    "It dances and sings a chilly song.",
    "The dress looks like it is made of ice.",
    "From head to toe it is about 1.4 meters.",
    "It weighs about 41 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Jynx first shows up in The Mandarin Island Miss Match.",
    "It grew up from Smoochum.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c9/Lippoutou_de_l%27Infirmi%C3%A8re_Jo%C3%ABlle.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f1/Lippoutou_Grobisou.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/jynx.jpg" },
  ] },
  { id: 125, name: "Electabuzz", slug: "electabuzz", type: "electric", say: "eh, leck ta buzz", facts: [
    "Sparks jump between the two antennae on its head.",
    "Yellow fur, black stripes, and two antennae.",
    "Sparks jump between the antennae.",
    "Its tail ends in a little lightning shape.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 30 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Electabuzz in Smells Like Team Spirit!.",
    "It grows up from Elekid, and it can still grow into Electivire.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/ed/%C3%89lektek_Boule_%C3%89lek.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/17/%C3%89lektek_de_Tony.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/electabuzz.jpg" },
  ] },
  { id: 126, name: "Magmar", slug: "magmar", type: "fire", say: "mag mar", facts: [
    "Flames puff from its mouth and from its hands.",
    "A duck-like bill and flames at its mouth.",
    "Fire puffs from its hands too.",
    "The belly is marked like a flame.",
    "From head to toe it is about 1.3 meters.",
    "It weighs about 44 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, Magmar first shows up in Riddle Me This.",
    "It grows up from Magby, and it can still grow into Magmortar.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/66/Magmar_d%27Auguste.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fa/Magmar_du_Chef_de_chantier.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/magmar.jpg" },
  ] },
  { id: 127, name: "Pinsir", slug: "pinsir", type: "bug", say: "pin sir", facts: [
    "Huge horns can pick up something as heavy as a log.",
    "Huge horns on a brown beetle body.",
    "It can pick up a log with those horns.",
    "The horns open and snap shut.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 55 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Pinsir in Volcanion and the Mechanical Marvel.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/14/LV094_-_Scarabrute_de_Goh.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/52/Scarabrute_de_M%C3%A9lokrika_Kelly.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/pinsir.jpg" },
  ] },
  { id: 128, name: "Tauros", slug: "tauros", type: "normal", say: "tore ross", facts: [
    "Three tails whip while it charges on strong hooves.",
    "Three tails and a hump on a big bull.",
    "It charges on strong hooves.",
    "The three tails whip when it runs.",
    "From head to toe it is about 1.4 meters.",
    "It weighs about 88 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, Tauros first shows up in Showdown at the Po-ké Corral.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/5e/Tauros_sauvages_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2f/LH115_-_Tauros_T%C3%A9racristal.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/tauros.jpg" },
  ] },
  { id: 129, name: "Magikarp", slug: "magikarp", type: "water", say: "madge eh carp", facts: [
    "This floppy orange fish splashes a lot and looks very silly.",
    "An orange fish with whiskers and floppy fins.",
    "It splashes a lot and looks a bit silly.",
    "It is weak now, but it can become a giant serpent.",
    "From head to toe it is about 90 centimeters.",
    "It weighs about 10 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Magikarp in Battle Aboard the St. Anne!.",
    "When it grows up, it can become Gyarados.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/ff/LV024_-_Magicarpe_Sommeil.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/46/Magicarpe_de_la_Team_Rocket.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/magikarp.jpg" },
  ] },
  { id: 130, name: "Gyarados", slug: "gyarados", type: "water", say: "gare uh doss", facts: [
    "A giant sea serpent can leap out of the water and roar.",
    "A long blue sea serpent with whiskers.",
    "It leaps out of the water and roars.",
    "The angry mouth is full of sharp teeth.",
    "From head to toe it is about 6.5 meters.",
    "It weighs about 235 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Gyarados in Pokémon Shipwreck.",
    "It grew up from Magikarp.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a1/L%C3%A9viator_de_Lysandre.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0a/L%C3%A9viator_de_Paul.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/gyarados.jpg" },
  ] },
  { id: 131, name: "Lapras", slug: "lapras", type: "water", say: "lap russ", facts: [
    "A kind giant lets friends ride on the shell on its back.",
    "A gentle giant with a gray shell on its back.",
    "Friends can ride on that shell across the water.",
    "It sings when it feels calm.",
    "From head to toe it is about 2.5 meters.",
    "It weighs about 220 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, Lapras first shows up in The Lost Lapras.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/4b/Lokhlass_-_Film_22.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/eb/LH025_-_Lokhlass_de_Lucius.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/lapras.jpg" },
  ] },
  { id: 132, name: "Ditto", slug: "ditto", type: "normal", say: "dit toe", facts: [
    "It can smoosh into a copy of whatever is standing nearby.",
    "A purple blob with a simple face.",
    "It squishes into a copy of who is nearby.",
    "The copy can match a face, a color, or a shape.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 4 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Ditto first shows up in Ditto's Mysterious Mansion.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/5b/LH118_-_Activit%C3%A9_Myrtille_Trouver_des_blocs_M%C3%A9tamorph.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/59/LH138_-_M%C3%A9tamorph.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/ditto.jpg" },
  ] },
  { id: 133, name: "Eevee", slug: "eevee", type: "normal", say: "ee vee", facts: [
    "This fluffy buddy can grow up in lots of different ways.",
    "Brown fur, a cream collar, and a bushy tail.",
    "It can grow up in many different ways.",
    "The collar fluffs up when it is excited.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 6.5 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, you can spot Eevee in May's Egg-Cellent Adventure.",
    "When it grows up, it can become Vaporeon or another grown-up form.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/99/LV094_-_%C3%89voli_de_Chlo%C3%A9.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/21/LH136_-_%C3%89voli_de_Spinel.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/eevee.jpg" },
  ] },
  { id: 134, name: "Vaporeon", slug: "vaporeon", type: "water", say: "vuh, pore ee on", facts: [
    "A fin on its head and a mermaid tail help it swim.",
    "A blue body, a fin on its head, and a fish tail.",
    "It swims by melting into the water around it.",
    "The fin and the tail make it look like a mermaid.",
    "From head to toe it is about 1 meter.",
    "It weighs about 29 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Vaporeon first shows up in The Battling Eevee Brothers.",
    "It grew up from Eevee.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d9/LH127_-_Aquali_Absorbe-Eau.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/08/LH141_-_Aquali_Eau_Revoir.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/vaporeon.jpg" },
  ] },
  { id: 135, name: "Jolteon", slug: "jolteon", type: "electric", say: "jol tee on", facts: [
    "Spiky fur stands straight up and crackles with sparks.",
    "Spiky yellow fur and a white ruff.",
    "The spikes crackle when it runs.",
    "It is one of the fastest Pokémon on four legs.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 24 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Jolteon first shows up in The Battling Eevee Brothers.",
    "It grew up from Eevee.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7f/LH120_-_Voltali_Crocs_%C3%89clair.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/51/PE08_-_Voltali.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/jolteon.jpg" },
  ] },
  { id: 136, name: "Flareon", slug: "flareon", type: "fire", say: "flair ee on", facts: [
    "A fluffy collar around its neck stays toasty warm.",
    "Fluffy orange fur and a warm collar.",
    "Heat builds in its body and stays there.",
    "The collar feels toasty, like a scarf.",
    "From head to toe it is about 90 centimeters.",
    "It weighs about 25 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Flareon first shows up in The Battling Eevee Brothers.",
    "It grew up from Eevee.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9a/LH102_-_Pyroli_de_Pania.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2a/LH133_-_Pyroli_Canicule.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/flareon.jpg" },
  ] },
  { id: 137, name: "Porygon", slug: "porygon", type: "normal", say: "pore ee gon", facts: [
    "Its body is built from chunky digital blocks.",
    "A body made of pink and blue blocks.",
    "It looks like a digital duck.",
    "Sharp corners show it was made on a computer.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 36 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Porygon first shows up in A Chansey Operation.",
    "When it grows up, it can become Porygon2.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c6/Porygon_Aff%C3%BBtage.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/1b/Porygon_Conversion.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/porygon.jpg" },
  ] },
  { id: 138, name: "Omanyte", slug: "omanyte", type: "rock", say: "ah man ite", facts: [
    "A spiral shell covers this little swimmer from long ago.",
    "A spiral shell and little tentacles.",
    "It is a swimmer from a very long time ago.",
    "The shell curls like a snail.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 7.5 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, you can spot Omanyte in Attack of the Prehistoric Pokémon.",
    "When it grows up, it can become Omastar.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/49/DP017_-_Amonita_du_Professeur_Kenzo.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/omanyte.jpg" },
  ] },
  { id: 139, name: "Omastar", slug: "omastar", type: "rock", say: "ah mah star", facts: [
    "Spikes ring the shell of this ancient sea hunter.",
    "Spikes ring a heavy spiral shell.",
    "Tentacles reach out from under the shell.",
    "It is the grown-up hunter of the little fossil.",
    "From head to toe it is about 1 meter.",
    "It weighs about 35 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, Omastar first shows up in Attack of the Prehistoric Pokémon.",
    "It grew up from Omanyte.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/18/LH035_-_Amonistar_Boule_Roc.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f8/Mini-Film_01_-_Amonistar_du_Parc.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/omastar.jpg" },
  ] },
  { id: 140, name: "Kabuto", slug: "kabuto", type: "rock", say: "kuh, boo toe", facts: [
    "It tucks under a hard round shell, like a living fossil.",
    "Eyes peek from under a hard brown shell.",
    "It is a fossil that came back to life.",
    "The shell covers it like a round shield.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 12 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, Kabuto first shows up in Attack of the Prehistoric Pokémon.",
    "When it grows up, it can become Kabutops.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3a/Ma%C3%AEtre_des_Mirages_-_Amonita_et_Kabuto.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/30/Kabuto_Aqua-Jet.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/kabuto.jpg" },
  ] },
  { id: 141, name: "Kabutops", slug: "kabutops", type: "rock", say: "kuh boo tops", facts: [
    "Sharp blades on its arms cut through the water.",
    "Blades on its arms and a sleek body.",
    "It cuts through the water with those blades.",
    "The eyes still look like the little fossil's eyes.",
    "From head to toe it is about 1.3 meters.",
    "It weighs about 40 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, you can spot Kabutops in Attack of the Prehistoric Pokémon.",
    "It grew up from Kabuto.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9e/Kabutops_anim%C3%A9.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/96/Kabutops_Tir_de_Boue.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/kabutops.jpg" },
  ] },
  { id: 142, name: "Aerodactyl", slug: "aerodactyl", type: "rock", say: "air row, dak till", facts: [
    "Stony wings let this ancient flyer soar.",
    "Stony wings, fangs, and a long tail.",
    "It is an ancient flyer that soars again.",
    "The wings are made of rock, but they still fly.",
    "From head to toe it is about 1.8 meters.",
    "It weighs about 59 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Aerodactyl in Restore and Renew!.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/ae/LH043_-_Pt%C3%A9ra_de_Sidienne.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/ec/LH065_-_Pt%C3%A9ra_de_Sidienne.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/aerodactyl.jpg" },
  ] },
  { id: 143, name: "Snorlax", slug: "snorlax", type: "normal", say: "snore lacks", facts: [
    "This huge sleepy giant eats a giant meal, then naps.",
    "A huge body, a cream belly, and tiny feet.",
    "It eats a giant meal, then falls asleep.",
    "It can nap in the path and block the whole road.",
    "From head to toe it is about 2.1 meters.",
    "It weighs about 460 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Snorlax in Snack Attack!.",
    "It grew up from Munchlax.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c2/LV047_-_Ronflex_d%27un_Dresseur.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/48/AG088_-_Pens%C3%A9e_-_Ronflex.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/snorlax.jpg" },
  ] },
  { id: 144, name: "Articuno", slug: "articuno", type: "ice", say: "art tick, coo no", facts: [
    "Icy wings freeze the clouds when this legend flies.",
    "Long blue tail streamers and icy wings.",
    "Cold air follows it when it flies.",
    "It is a legend of ice and snow.",
    "From head to toe it is about 1.7 meters.",
    "It weighs about 55 kilograms.",
    "It lives around places people hardly ever go.",
    "In the cartoon, Articuno first shows up in The Power of One.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/cf/Artikodin_Glaciation.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fd/Artikodin_Triple_Axel.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/articuno.jpg" },
  ] },
  { id: 145, name: "Zapdos", slug: "zapdos", type: "electric", say: "zap dose", facts: [
    "Thunder booms when this electric bird flaps its wings.",
    "Spiky yellow feathers and a sharp beak.",
    "Thunder booms when its wings flap.",
    "It is a legend of lightning.",
    "From head to toe it is about 1.6 meters.",
    "It weighs about 53 kilograms.",
    "It lives around places people hardly ever go.",
    "In the cartoon, Zapdos first shows up in The Power of One.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/cb/%C3%89lecthor_Fatal-Foudre.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b2/%C3%89lecthor_sauvage_-_Film_10_Intro.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/zapdos.jpg" },
  ] },
  { id: 146, name: "Moltres", slug: "moltres", type: "fire", say: "mole trace", facts: [
    "Fire trails behind the burning wings of this legend.",
    "Orange wings that burn like fire.",
    "Flames trail behind it in the sky.",
    "It is a legend of heat and fire.",
    "From head to toe it is about 2 meters.",
    "It weighs about 60 kilograms.",
    "It lives around places people hardly ever go.",
    "In the cartoon, you can spot Moltres in The Power of One.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/42/Sulfura_Flamme_Ultime.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/db/Sulfura_Vent_Violent.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/moltres.jpg" },
  ] },
  { id: 147, name: "Dratini", slug: "dratini", type: "dragon", say: "duh, tee nee", facts: [
    "This tiny dragon sheds its skin each time it grows.",
    "A small blue serpent with a white belly.",
    "It lives in the water and grows into a longer dragon.",
    "Even tiny, it is already a dragon.",
    "From head to toe it is about 1.8 meters.",
    "It weighs about 3.3 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, Dratini first shows up in Beauty is Skin Deep.",
    "When it grows up, it can become Dragonair.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f1/LV090_-_Fantominus_et_Minidraco_de_Sacha.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/51/%C3%89pisode_35_-_Minidraco_%28flash-back%29.PNG" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/dratini.jpg" },
  ] },
  { id: 148, name: "Dragonair", slug: "dragonair", type: "dragon", say: "drag gon, air", facts: [
    "A long, smooth body floats like a friendly serpent.",
    "A long blue body with orbs along its neck.",
    "A pearl shines at the tip of its tail.",
    "It floats as if the air were water.",
    "From head to toe it is about 4 meters.",
    "It weighs about 16 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Dragonair in Beauty is Skin Deep.",
    "It grows up from Dratini, and it can still grow into Dragonite.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fb/LV010_-_Draco_volant.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d5/Draco_d%27Am%C3%A9lia.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/dragonair.jpg" },
  ] },
  { id: 149, name: "Dragonite", slug: "dragonite", type: "dragon", say: "drag gon ite", facts: [
    "Small wings and a round belly make this dragon look kind.",
    "Small wings, antennae, and a round belly.",
    "It can fly faster than a storm wind.",
    "It looks kind, and it is very strong.",
    "From head to toe it is about 2.2 meters.",
    "It weighs about 210 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Dragonite in Hello, Pummelo!.",
    "It grew up from Dragonair.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/90/LH106_-_Dracolosse_d%27Ult.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/ea/LH117_-_Dracolosse_d%27Irido.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/dragonite.jpg" },
  ] },
  { id: 150, name: "Mewtwo", slug: "mewtwo", type: "psychic", say: "myoo, too", facts: [
    "It looks a lot like Mew, only bigger and much stronger.",
    "A purple body and a tube on its long tail.",
    "It looks like Mew, only taller and stronger.",
    "It was made by people, not born in the wild.",
    "From head to toe it is about 2 meters.",
    "It weighs about 122 kilograms.",
    "It lives around places people hardly ever go.",
    "In the cartoon, you can spot Mewtwo in Genesect and the Legend Awakened.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/45/PE08_-_Mewtwo.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/00/LV046_-_Mewtwo.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/mewtwo.jpg" },
  ] },
  { id: 151, name: "Mew", slug: "mew", type: "psychic", say: "myoo", facts: [
    "This tiny legend is so small and rare it feels like a secret.",
    "A tiny pink body and a very long tail.",
    "It is so rare it feels like a secret.",
    "It can vanish in a blink.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 4 kilograms.",
    "It lives around places people hardly ever go.",
    "In the cartoon, you can spot Mew in Mewtwo Strikes Back.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/bd/Mew-Film_1.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/6c/Mew_sauvage_-_Film_10_Intro.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/mew.jpg" },
  ] },
  { id: 172, name: "Pichu", slug: "pichu", type: "electric", say: "pee choo", facts: [
    "A baby spark mouse has rosy cheeks that crackle.",
    "A tiny yellow mouse with black-tipped ears.",
    "The cheeks spark before it knows how to aim them.",
    "It is the baby form of the famous spark mouse.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 2 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Pichu in Pikachu & Pichu.",
    "When it grows up, it can become Pikachu.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/49/Pichu_de_Dresseur_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7d/LH138_-_Pichu_Encore.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/pichu.jpg" },
  ] },
  { id: 175, name: "Togepi", slug: "togepi", type: "fairy", say: "toe geh pee", facts: [
    "Happy little spikes cover the shell of this egg buddy.",
    "A round shell covered in happy little spikes.",
    "It rocks the shell when it feels glad.",
    "Kindness helps the egg buddy grow.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 1.5 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Togepi in Attack of the Prehistoric Pokémon.",
    "When it grows up, it can become Togetic.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7d/Film_04_%26_05_-_Intro_-_Togepi_d%27Ondine.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/78/Film_02_-_Togepi_d%27Ondine.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/togepi.jpg" },
  ] },
  { id: 196, name: "Espeon", slug: "espeon", type: "psychic", say: "ess pee on", facts: [
    "A gem on its forehead glows, and its tail splits in two.",
    "Purple fur, a red gem, and a tail split in two.",
    "The gem glows in the sunshine.",
    "It is the sun form of the fluffy buddy.",
    "From head to toe it is about 90 centimeters.",
    "It weighs about 26 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Espeon first shows up in Espeon, Not Included.",
    "It grew up from Eevee.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/6c/LV079_-_Mentali_Pok%C3%A9dex.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a3/Mini-Film_19_-_Mentali.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/espeon.jpg" },
  ] },
  { id: 197, name: "Umbreon", slug: "umbreon", type: "dark", say: "um bree on", facts: [
    "Yellow rings light up when this dark fox slips into the night.",
    "Black fur and yellow rings that light up.",
    "The rings glow brighter at night.",
    "It is the moon form of the fluffy buddy.",
    "From head to toe it is about 1 meter.",
    "It weighs about 27 kilograms.",
    "It lives around towns and cities.",
    "In the cartoon, Umbreon first shows up in Power Play!.",
    "It grew up from Eevee.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c1/LH012_-_Noctali_de_Spinel.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/52/LH013_-_Noctali_de_Spinel.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/umbreon.jpg" },
  ] },
  { id: 208, name: "Steelix", slug: "steelix", type: "steel", say: "steel licks", facts: [
    "Bits of metal stack up into a very long steel snake.",
    "Gray metal rocks stacked into a long snake.",
    "Crystals glitter along its body.",
    "It is the steel form of the big rock snake.",
    "From head to toe it is about 9.2 meters.",
    "It weighs about 400 kilograms.",
    "It lives around dark caves.",
    "In the cartoon, you can spot Steelix in Grating Spaces!.",
    "It grew up from Onix.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2e/LH092_-_Steelix_Fracass%27T%C3%AAte.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/73/LH149_-_Steelix_Tacle_Lourd.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/steelix.jpg" },
  ] },
  { id: 230, name: "Kingdra", slug: "kingdra", type: "dragon", say: "king druh", facts: [
    "It shoots swirls of water from the snout on its dragon head.",
    "A blue dragon head on a seahorse body.",
    "It shoots swirls of water from its snout.",
    "It can hide deep where other fish cannot go.",
    "From head to toe it is about 1.8 meters.",
    "It weighs about 152 kilograms.",
    "It lives around the ocean.",
    "In the cartoon, Kingdra first shows up in Spell of the Unown: Entei.",
    "It grew up from Seadra.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9e/Hypoc%C3%A9an_Hyporoi_film_9.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/76/LH116_-_Hyporoi_Aquatacle.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/kingdra.jpg" },
  ] },
  { id: 252, name: "Treecko", slug: "treecko", type: "grass", say: "tree ko", facts: [
    "Little hooks on its feet let this gecko climb trees.",
    "A green gecko with a yellow belly.",
    "Hooks on its feet stick to tree bark.",
    "The tail helps it balance on a branch.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 5 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Treecko in Tree's a Crowd.",
    "When it grows up, it can become Grovyle.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b5/Arcko_du_P%C3%A8re_de_St%C3%A9phanie.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/98/AG041_-_Arcko_de_Sacha.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/treecko.jpg" },
  ] },
  { id: 255, name: "Torchic", slug: "torchic", type: "fire", say: "tor chick", facts: [
    "A warm fire burns inside this fluffy chick's tummy.",
    "A fluffy orange chick with a cream belly.",
    "A warm fire burns inside its tummy.",
    "It hops more than it flies.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 2.5 kilograms.",
    "It lives around grassy fields.",
    "In the cartoon, you can spot Torchic in Get the Show on the Road!.",
    "When it grows up, it can become Combusken.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/55/Poussifeu_de_Harmonie.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f9/AG005_-_Poussifeu_de_Flora.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/torchic.jpg" },
  ] },
  { id: 258, name: "Mudkip", slug: "mudkip", type: "water", say: "mud kip", facts: [
    "The big fin on its head can feel waves in the water.",
    "A blue body and a big fin on its head.",
    "The fin can feel which way the water moves.",
    "It likes mud as much as it likes water.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 7.6 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Mudkip in A Mudkip Mission.",
    "When it grows up, it can become Marshtomp.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f5/AG001_-_Gobou_du_Professeur_Seko.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/cd/Gobou_de_Pierre.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/mudkip.jpg" },
  ] },
  { id: 329, name: "Vibrava", slug: "vibrava", type: "dragon", say: "vie, brah va", facts: [
    "See-through wings buzz like a dragonfly over the sand.",
    "A green body and see-through wings.",
    "The wings buzz like a dragonfly over sand.",
    "Its eyes are big and red.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 15 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, Vibrava first shows up in Beg, Burrow and Steal.",
    "It grows up from Trapinch, and it can still grow into Flygon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/ce/LH084_-_Vibraninf_Draco-Queue.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0b/LV090_-_Vibraninf_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/vibrava.jpg" },
  ] },
  { id: 330, name: "Flygon", slug: "flygon", type: "dragon", say: "fly gon", facts: [
    "Its wings hum, and red covers hide its eyes.",
    "Green scales and red covers over its eyes.",
    "The wings hum a sound like a song.",
    "It flies low over the desert.",
    "From head to toe it is about 2 meters.",
    "It weighs about 82 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, you can spot Flygon in Making Battles in the Sand!.",
    "It grew up from Vibrava.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/92/Lib%C3%A9gon_de_Roy.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f8/Lib%C3%A9gon_sauvage_-_Film_23.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/flygon.jpg" },
  ] },
  { id: 334, name: "Altaria", slug: "altaria", type: "dragon", say: "al, tar ee uh", facts: [
    "Fluffy cloud wings wrap around this singing dragon bird.",
    "A blue bird wrapped in fluffy cloud wings.",
    "It sings with a soft, pretty voice.",
    "The clouds around it feel like cotton.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 21 kilograms.",
    "It lives around the woods.",
    "In the cartoon, you can spot Altaria in Sky High Gym Battle!.",
    "It grew up from Swablu.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a3/Altaria_Abattage.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b9/Altaria_Canicule.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/altaria.jpg" },
  ] },
  { id: 359, name: "Absol", slug: "absol", type: "dark", say: "ab sol", facts: [
    "The horn on its head is a warning that trouble is near.",
    "White fur, a dark face, and a curved horn.",
    "The horn is a warning that a storm is near.",
    "It would rather warn friends than scare them.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 47 kilograms.",
    "It lives around the mountains.",
    "In the cartoon, you can spot Absol in Absol Absolved!.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/86/Absol_Tranche-Nuit.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d1/Absol_de_Goh.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/absol.jpg" },
  ] },
  { id: 371, name: "Bagon", slug: "bagon", type: "dragon", say: "bay gon", facts: [
    "This little dragon bonks its head to make its skull tougher.",
    "A little gray dragon with a hard head.",
    "It bonks its head to make the skull tougher.",
    "It dreams of growing wings.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 42 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, Bagon first shows up in Let Bagons be Bagons.",
    "When it grows up, it can become Shelgon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/48/Draby_de_Matty_Crow.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/db/Draby_Dracosouffle.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/bagon.jpg" },
  ] },
  { id: 372, name: "Shelgon", slug: "shelgon", type: "dragon", say: "shell gon", facts: [
    "A hard shell wraps almost its whole body.",
    "A hard shell covers almost its whole body.",
    "It waits inside while the body changes.",
    "Only its eyes and a bit of face show.",
    "From head to toe it is about 1.1 meters.",
    "It weighs about 110 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, Shelgon first shows up in Let Bagons Be Bagons.",
    "It grows up from Bagon, and it can still grow into Salamence.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/1e/Drackhaus_d%27Aragon.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/45/AG101_-_Drackhaus_d%27Aragon.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/shelgon.jpg" },
  ] },
  { id: 373, name: "Salamence", slug: "salamence", type: "dragon", say: "sal uh mence", facts: [
    "Huge wings unfold when this dragon finally breaks free.",
    "Huge red wings and a long tail.",
    "The wings grew because it wanted so badly to fly.",
    "It soars once the shell finally breaks.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 103 kilograms.",
    "It lives around rocky ground.",
    "In the cartoon, you can spot Salamence in Mutiny in the Bounty!.",
    "It grew up from Shelgon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e1/LH124_-_Drattak.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2b/Drattak_d%27Alva_-_Film_19.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/salamence.jpg" },
  ] },
  { id: 380, name: "Latias", slug: "latias", type: "dragon", say: "lat ee us", facts: [
    "This red dragon can vanish and then zip through the sky.",
    "A red body shaped a bit like a jet.",
    "It can vanish, then zip across the sky.",
    "White feathers trail from its wings.",
    "From head to toe it is about 1.4 meters.",
    "It weighs about 40 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Latias in Hoopa and the Clash of Ages.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/06/LV146_-_Latias_humaine.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/1f/Film_05_-_Latias_Sauvage.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/latias.jpg" },
  ] },
  { id: 381, name: "Latios", slug: "latios", type: "dragon", say: "lat ee ohs", facts: [
    "This blue dragon can share a feeling with a friend far away.",
    "A blue body with the same jet shape.",
    "It can share a feeling with a friend far away.",
    "It is a little taller than its red partner.",
    "From head to toe it is about 2 meters.",
    "It weighs about 60 kilograms.",
    "It lives around the edge of the water.",
    "In the cartoon, you can spot Latios in Hoopa and the Clash of Ages.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c4/Latios_Aurasph%C3%A8re.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/24/Latios_Psykoud%27Boul.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/latios.jpg" },
  ] },
  { id: 384, name: "Rayquaza", slug: "rayquaza", type: "dragon", say: "ray, kway zuh", facts: [
    "It soars above the clouds and can quiet a wild wind.",
    "A long green body with yellow ring marks.",
    "It lives way up above the clouds.",
    "It can quiet a huge wild wind.",
    "From head to toe it is about 7 meters.",
    "It weighs about 206 kilograms.",
    "It lives around places people hardly ever go.",
    "In the cartoon, you can spot Rayquaza in Destiny Deoxys.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9e/LH006_-_Rayquaza_chromatique.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/53/LH044_-_Rayquaza.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/rayquaza.jpg" },
  ] },
  { id: 393, name: "Piplup", slug: "piplup", type: "water", say: "pip lup", facts: [
    "This proud little penguin flaps its flippers and will not quit.",
    "A blue penguin with a yellow beak and proud eyes.",
    "It flaps its flippers and refuses to give up.",
    "The beak is strong for such a small bird.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 5.2 kilograms.",
    "In the cartoon, Piplup first shows up in Following A Maiden's Voyage!.",
    "When it grows up, it can become Prinplup.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/8f/LV089_-_Tiplouf_d%27Aurore_du_Monde_Parall%C3%A8le_-_Photo.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3d/LV090_-_Tiplouf_d%27Aurore.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/piplup.jpg" },
  ] },
  { id: 443, name: "Gible", slug: "gible", type: "dragon", say: "gib bull", facts: [
    "It hides in small caves and chomps with a very big mouth.",
    "A small land shark with a very big mouth.",
    "It hides in little caves and chomps.",
    "Stubby arms stick out from its sides.",
    "From head to toe it is about 70 centimeters.",
    "It weighs about 20 kilograms.",
    "In the cartoon, you can spot Gible in A Meteoric Rise to Excellence!.",
    "When it grows up, it can become Gabite.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/65/Griknot_de_Cynthia.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/12/LH048_-_Griknot_d%27Hassa.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/gible.jpg" },
  ] },
  { id: 444, name: "Gabite", slug: "gabite", type: "dragon", say: "gab, bite", facts: [
    "It keeps leaping, even though its wings are still small.",
    "A bigger shark body and still-small wings.",
    "It keeps leaping even before the wings work well.",
    "Sharp teeth show in its big grin.",
    "From head to toe it is about 1.4 meters.",
    "It weighs about 56 kilograms.",
    "In the cartoon, Gabite first shows up in Another One Gabites the Dust!.",
    "It grows up from Gible, and it can still grow into Garchomp.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/ee/Carmache_de_Cynthia.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b1/Carmache_Dracogriffe.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/gabite.jpg" },
  ] },
  { id: 445, name: "Garchomp", slug: "garchomp", type: "dragon", say: "gar chomp", facts: [
    "A tall fin and a shark-like body let it rush across the land.",
    "A tall fin and a body like a land shark.",
    "It can rush across sand faster than a car.",
    "The fin helps it steer at high speed.",
    "From head to toe it is about 1.9 meters.",
    "It weighs about 95 kilograms.",
    "In the cartoon, Garchomp first shows up in Top-Down Training!.",
    "It grew up from Gabite.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/17/Carchacrok_Dracogriffe.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/8b/Carchacrok_Pi%C3%A8ge_de_Roc.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/garchomp.jpg" },
  ] },
  { id: 448, name: "Lucario", slug: "lucario", type: "fighting", say: "loo, car ee oh", facts: [
    "Spikes on its paws help it feel what someone else feels.",
    "Blue fur, a chest spike, and spikes on its paws.",
    "It can feel what someone else is feeling.",
    "It stands on two legs like a fighter.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 54 kilograms.",
    "In the cartoon, Lucario first shows up in Lucario and the Mystery of Mew.",
    "It grew up from Riolu.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/79/LH090_-_Lucario_de_Rhod.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/ff/LH091_-_Lucario_Luminocanon.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/lucario.jpg" },
  ] },
  { id: 483, name: "Dialga", slug: "dialga", type: "dragon", say: "dee, awl gah", facts: [
    "A bright diamond shines on the chest of this time dragon.",
    "A blue metal body and a diamond on its chest.",
    "Stories say this dragon can change time.",
    "The diamond shines like glass.",
    "From head to toe it is about 5.4 meters.",
    "It weighs about 683 kilograms.",
    "In the cartoon, you can spot Dialga in Arceus and the Jewel of Life.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/04/Dialga_sauvage_-_Film_12.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b3/PG11_-_Dialga.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/dialga.jpg" },
  ] },
  { id: 484, name: "Palkia", slug: "palkia", type: "dragon", say: "pal kee ah", facts: [
    "Pearls on its shoulders glow like bits of outer space.",
    "A pink body with a pearl on each shoulder.",
    "Stories say this dragon can bend space.",
    "The pearls glow like bits of the sky.",
    "From head to toe it is about 4.2 meters.",
    "It weighs about 336 kilograms.",
    "In the cartoon, Palkia first shows up in The Rise of Darkrai.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/74/PG11_-_Palkia.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d1/Palkia_sauvage_-_Film_12.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/palkia.jpg" },
  ] },
  { id: 487, name: "Giratina", slug: "giratina", type: "dragon", say: "geer ah, tee nuh", facts: [
    "Ghostly wings and lots of legs let it slip between worlds.",
    "Gold bands, ghostly wings, and many legs.",
    "It can slip into a world beside our own.",
    "Six legs make it look like no other dragon.",
    "From head to toe it is about 4.5 meters.",
    "It weighs about 750 kilograms.",
    "In the cartoon, you can spot Giratina in Giratina and the Sky Warrior.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fb/PG11_-_Giratina.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2d/Giratina_Forme_Originelle_-_Film_12.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/giratina-altered.jpg" },
  ] },
  { id: 610, name: "Axew", slug: "axew", type: "dragon", say: "axe you", facts: [
    "Little tusks stick out from this cute dragon's cheeks.",
    "A small green dragon with tusks on its cheeks.",
    "It rubs those tusks on rocks to polish them.",
    "The tusks start little and grow huge.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 18 kilograms.",
    "In the cartoon, Axew first shows up in In The Shadow of Zekrom!.",
    "When it grows up, it can become Fraxure.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/4e/Coupenotte_de_Dresseur_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3e/Coupenotte_d%27Iris_-_Film_14.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/axew.jpg" },
  ] },
  { id: 611, name: "Fraxure", slug: "fraxure", type: "dragon", say: "frak shur", facts: [
    "Those tusks can crunch right through a hard rock.",
    "Bigger tusks and a tougher green body.",
    "The tusks can crunch a hard rock.",
    "Marks on the tusks show how much it has bitten.",
    "From head to toe it is about 1 meter.",
    "It weighs about 36 kilograms.",
    "In the cartoon, you can spot Fraxure in Thrash of the Titans!.",
    "It grows up from Axew, and it can still grow into Haxorus.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c1/Incisache_Double_Baffe.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f0/Incisache_Dracogriffe.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/fraxure.jpg" },
  ] },
  { id: 612, name: "Haxorus", slug: "haxorus", type: "dragon", say: "hax soar us", facts: [
    "Huge tusks and tough skin make this dragon mighty.",
    "Armor plates and tusks as big as swords.",
    "It can cut through a tree trunk with one tusk.",
    "This is the mighty end of the tusk family.",
    "From head to toe it is about 1.8 meters.",
    "It weighs about 106 kilograms.",
    "In the cartoon, one grows and changes during Thrash of the Titans!.",
    "It grew up from Fraxure.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/14/PG14_-_Tranchodon_de_Watson.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/89/Tranchodon_Abattage.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/haxorus.jpg" },
  ] },
  { id: 621, name: "Druddigon", slug: "druddigon", type: "dragon", say: "drud dig gun", facts: [
    "A rough red face and a spiky tail guard its cave.",
    "A rough red face and a spiky tail.",
    "It guards the mouth of its cave.",
    "The face looks like a stone mask.",
    "From head to toe it is about 1.6 meters.",
    "It weighs about 139 kilograms.",
    "In the cartoon, Druddigon first shows up in The Dragon Master's Path!.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/6d/Drakkarmin_de_Drac%C3%A9na.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/65/Drakkarmin_Draco-Rage.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/druddigon.jpg" },
  ] },
  { id: 633, name: "Deino", slug: "deino", type: "dragon", say: "dye no", facts: [
    "This little dragon bites first, because it cannot see yet.",
    "Black fur and a face with no eyes yet.",
    "It bumps around and bites to learn the world.",
    "The little tuft of hair sticks up.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 17 kilograms.",
    "In the cartoon, Deino first shows up in The Lonely Deino!.",
    "When it grows up, it can become Zweilous.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3b/BA_N2B2_-_Ratentif_et_Solochi_de_Dresseurs.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/deino.jpg" },
  ] },
  { id: 634, name: "Zweilous", slug: "zweilous", type: "dragon", say: "zvye luss", facts: [
    "Two heads bicker, then team up for one big chomp.",
    "Two heads on one dark, fuzzy body.",
    "The heads argue, then bite as a team.",
    "It still cannot see, so it feels its way.",
    "From head to toe it is about 1.4 meters.",
    "It weighs about 50 kilograms.",
    "In the cartoon, Zweilous first shows up in A Village Homecoming!.",
    "It grows up from Deino, and it can still grow into Hydreigon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/ad/Diamat_de_Dresseur_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/45/Diamat_Coup_Double.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/zweilous.jpg" },
  ] },
  { id: 635, name: "Hydreigon", slug: "hydreigon", type: "dragon", say: "hi, dry gun", facts: [
    "Three heads roar while six wings carry it through the dark.",
    "One big head, two arm heads, and six wings.",
    "All three heads can roar together.",
    "It flies through the dark on those wings.",
    "From head to toe it is about 1.8 meters.",
    "It weighs about 160 kilograms.",
    "In the cartoon, Hydreigon first shows up in ''White—Victini and Zekrom'' and ''Black—Victini and Reshiram''.",
    "It grew up from Zweilous.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2c/Trioxhydre_Rafale_%C3%89cailles.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/5d/Trioxhydre_de_Peter.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/hydreigon.jpg" },
  ] },
  { id: 643, name: "Reshiram", slug: "reshiram", type: "dragon", say: "resh ih ram", facts: [
    "A white dragon's tail burns like a giant torch.",
    "A white dragon with a tail like a torch.",
    "Blue eyes shine in its fluffy mane.",
    "Fire pours from the tail when it is serious.",
    "From head to toe it is about 3.2 meters.",
    "It weighs about 330 kilograms.",
    "In the cartoon, you can spot Reshiram in ''White—Victini and Zekrom'' and ''Black—Victini and Reshiram''.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/5e/Reshiram_Film_18.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/61/Reshiram_du_H%C3%A9ros_de_la_V%C3%A9rit%C3%A9_Film_14_flashback.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/reshiram.jpg" },
  ] },
  { id: 644, name: "Zekrom", slug: "zekrom", type: "dragon", say: "zeck rom", facts: [
    "A black dragon hides a thunderstorm inside its tail.",
    "A black dragon with a tail full of thunder.",
    "Red eyes glow in its heavy mane.",
    "The tail can crack like a storm.",
    "From head to toe it is about 2.9 meters.",
    "It weighs about 345 kilograms.",
    "In the cartoon, you can spot Zekrom in ''White—Victini and Zekrom'' and ''Black—Victini and Reshiram''.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/9c/Zekrom_Film_18.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/96/Zekrom_%C3%89clair_Croix.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/zekrom.jpg" },
  ] },
  { id: 646, name: "Kyurem", slug: "kyurem", type: "dragon", say: "kyoo rem", facts: [
    "Cold breath and icy wings can freeze the air around it.",
    "A gray body, icy wings, and a cold breath.",
    "Ice covers its head like a mask.",
    "The air around it can freeze.",
    "From head to toe it is about 3 meters.",
    "It weighs about 325 kilograms.",
    "In the cartoon, Kyurem first shows up in Kyurem VS. The Sword of Justice.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d0/BA_N2B2_-_Kyurem.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/44/Kyurem_Dracosouffle.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/kyurem.jpg" },
  ] },
  { id: 658, name: "Greninja", slug: "greninja", type: "water", say: "greh, nin jah", facts: [
    "A long tongue scarf whips out like a splash of water.",
    "A frog ninja with a long tongue scarf.",
    "It throws a shuriken made of water.",
    "Bubbles on its hands help the throw.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 40 kilograms.",
    "In the cartoon, one grows and changes during A Festival of Decisions!.",
    "It grew up from Frogadier.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/5f/Amphinobi_Brouillard.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/4a/Amphinobi_Sheauriken.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/greninja.jpg" },
  ] },
  { id: 700, name: "Sylveon", slug: "sylveon", type: "fairy", say: "sill vee on", facts: [
    "Ribbon feelers swirl around and make everyone feel calm.",
    "Pink fur, bows, and ribbon feelers.",
    "The ribbons swirl and help friends feel calm.",
    "It senses feelings through those ribbons.",
    "From head to toe it is about 1 meter.",
    "It weighs about 24 kilograms.",
    "In the cartoon, one grows and changes during Party Dancecapades!.",
    "It grew up from Eevee.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/25/LH102_-_Nymphali_Joli_Sourire.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c8/Mini-Film_19_-_Nymphali.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/sylveon.jpg" },
  ] },
  { id: 704, name: "Goomy", slug: "goomy", type: "dragon", say: "goo mee", facts: [
    "This gooey little dragon is slippery and very shy.",
    "A tiny purple dragon made of goo.",
    "Two little horns poke out of its head.",
    "It is slippery, shy, and very squishy.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 2.8 kilograms.",
    "In the cartoon, Goomy first shows up in A Slippery Encounter!.",
    "When it grows up, it can become Sliggoo.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c1/Mucuscule_de_Sacha.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/3b/Mucuscule_Danse_Pluie.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/goomy.jpg" },
  ] },
  { id: 705, name: "Sliggoo", slug: "sliggoo", type: "dragon", say: "slee goo", facts: [
    "A gooey shell sits on its back like a melted snail.",
    "A snail-like body with a gooey shell.",
    "Its eyes are hidden under the goo.",
    "It slides along and leaves a wet trail.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 18 kilograms.",
    "In the cartoon, one grows and changes during An Oasis of Hope!.",
    "It grows up from Goomy, and it can still grow into Goodra.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/ad/Colimucus_Dracosouffle.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/32/Colimucus_de_Sacha.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/sliggoo.jpg" },
  ] },
  { id: 706, name: "Goodra", slug: "goodra", type: "dragon", say: "goo druh", facts: [
    "This friendly goo dragon gives big squishy hugs.",
    "A big friendly dragon with gooey horns.",
    "It gives squishy hugs when it likes you.",
    "The slime makes it hard to hold on to.",
    "From head to toe it is about 2 meters.",
    "It weighs about 150 kilograms.",
    "In the cartoon, one grows and changes during Good Friends, Great Training!.",
    "It grew up from Sliggoo.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/bc/Muplodocus_de_Dianth%C3%A9a.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2e/Muplodocus_de_Roy.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/goodra.jpg" },
  ] },
  { id: 714, name: "Noibat", slug: "noibat", type: "dragon", say: "noy bat", facts: [
    "Huge ears listen hard while it hangs upside down.",
    "A small bat with enormous ears.",
    "It hangs upside down and listens.",
    "Its ears send a sound people can barely hear.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 8 kilograms.",
    "In the cartoon, one hatches in A Not-So-Flying Start!.",
    "When it grows up, it can become Noivern.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a4/LH084_-_Sonistrelle.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/54/Sonistrelle_Grincement.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/noibat.jpg" },
  ] },
  { id: 715, name: "Noivern", slug: "noivern", type: "dragon", say: "noy vern", facts: [
    "Giant ears and wide wings help it fly in the dark.",
    "Giant ears and wide wings on a big body.",
    "A blast of sound booms from its mouth.",
    "It flies in the dark using those ears.",
    "From head to toe it is about 1.5 meters.",
    "It weighs about 85 kilograms.",
    "In the cartoon, one grows and changes during An Electrifying Rage!.",
    "It grew up from Noibat.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/4b/Bruyverne_Bang_Sonique.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/4b/Bruyverne_Croc_Fatal.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/noivern.jpg" },
  ] },
  { id: 718, name: "Zygarde", slug: "zygarde", type: "dragon", say: "zye gard", facts: [
    "Green hexagon bits can snap together into one guardian.",
    "Green and black pieces like little cells.",
    "The cells can join into a dog shape.",
    "They can also stretch into a long snake.",
    "From head to toe it is about 5 meters.",
    "It weighs about 305 kilograms.",
    "In the cartoon, Zygarde first shows up in Mega Evolution Special IV.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2f/LH045_-_Zygarde_de_Gibeon.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/41/LH054_-_Zygarde_de_Gibeon.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/zygarde.jpg" },
  ] },
  { id: 776, name: "Turtonator", slug: "turtonator", type: "dragon", say: "turt nay ter", facts: [
    "A spiky shell on its back can blast fire from its nose.",
    "A spiky shell and a nose that puffs fire.",
    "The shell can blast open when it is hit.",
    "It looks like a turtle mixed with a dragon.",
    "From head to toe it is about 2 meters.",
    "It weighs about 212 kilograms.",
    "In the cartoon, you can spot Turtonator in Alola to New Adventure!.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b3/Boumata_Exploforce.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/d/d9/Boumata_Pyro-Explosion_Cataclysmique.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/turtonator.jpg" },
  ] },
  { id: 778, name: "Mimikyu", slug: "mimikyu", type: "ghost", say: "mee mee kyoo", facts: [
    "A ragged costume hides a shy little shadow underneath.",
    "A ragged cloth costume with a drawn-on face.",
    "A shy shadow hides underneath the disguise.",
    "The costume is sewn to look like a famous mouse.",
    "From head to toe it is about 20 centimeters.",
    "It is light, about 700 grams.",
    "In the cartoon, Mimikyu first shows up in Loading the Dex!.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/e/e0/Mimiqui_Griffe_Ombre.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f0/Mimiqui_de_Jessie_sous_l%27eau.jpg" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/mimikyu.jpg" },
  ] },
  { id: 780, name: "Drampa", slug: "drampa", type: "dragon", say: "dram puh", facts: [
    "A fluffy beard and a kind face make this dragon gentle.",
    "A fluffy beard and a gentle old face.",
    "It likes to play with children.",
    "The beard is as soft as a cloud.",
    "From head to toe it is about 3 meters.",
    "It weighs about 185 kilograms.",
    "In the cartoon, Drampa first shows up in Tasting the Bitter with the Sweet!.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/17/SL059_-_Dra%C3%AFeul.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/81/SL073_-_Dra%C3%AFeul.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/drampa.jpg" },
  ] },
  { id: 782, name: "Jangmo-o", slug: "jangmoo", type: "dragon", say: "jang, moh oh", facts: [
    "Scales on its body clang like a tiny gong.",
    "Yellow scales on a small gray dragon.",
    "The scales clang together like a tiny gong.",
    "It practices that sound every day.",
    "From head to toe it is about 60 centimeters.",
    "It weighs about 30 kilograms.",
    "In the cartoon, Jangmo-o first shows up in Family Determination!.",
    "When it grows up, it can become Hakamo-o.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7a/SL052_-_B%C3%A9b%C3%A9caille%2C_%C3%89ca%C3%AFd_et_%C3%89ka%C3%AFser_Dominant_%28Flash-back%29.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/jangmo-o.jpg" },
  ] },
  { id: 783, name: "Hakamo-o", slug: "hakamoo", type: "dragon", say: "hah kah, moh oh", facts: [
    "It bangs its scales together to practice a battle song.",
    "Bigger scales and stronger arms.",
    "It bangs the scales to practice a battle song.",
    "The clanging is louder than the little one's.",
    "From head to toe it is about 1.2 meters.",
    "It weighs about 47 kilograms.",
    "In the cartoon, Hakamo-o first shows up in Family Determination!.",
    "It grows up from Jangmo-o, and it can still grow into Kommo-o.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7a/SL052_-_B%C3%A9b%C3%A9caille%2C_%C3%89ca%C3%AFd_et_%C3%89ka%C3%AFser_Dominant_%28Flash-back%29.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/hakamo-o.jpg" },
  ] },
  { id: 784, name: "Kommo-o", slug: "kommoo", type: "dragon", say: "koh, moh oh", facts: [
    "Clanging scales boom like a great big drum.",
    "Scales all over its body like armor.",
    "It clangs them so they boom like a drum.",
    "A beard of scales hangs from its chin.",
    "From head to toe it is about 1.6 meters.",
    "It weighs about 78 kilograms.",
    "In the cartoon, Kommo-o first shows up in Family Determination!.",
    "It grew up from Hakamo-o.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/04/LV045_-_%C3%89ka%C3%AFser.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/7e/SL129_-_%C3%89ka%C3%AFser_d%27un_Dresseur.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/kommo-o.jpg" },
  ] },
  { id: 840, name: "Applin", slug: "applin", type: "dragon", say: "ap lin", facts: [
    "A little worm peeks out of a shiny red apple.",
    "A shiny red apple with a little worm inside.",
    "Two eyes and a mouth peek from the apple.",
    "The apple is its home and its armor.",
    "From head to toe it is about 20 centimeters.",
    "It is light, about 500 grams.",
    "In the cartoon, Applin first shows up in A One-Stick Wonder!.",
    "When it grows up, it can become Flapple or another grown-up form.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/b2/LH024_-_Verpom.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0e/LH052_-_Verpom.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/applin.jpg" },
  ] },
  { id: 841, name: "Flapple", slug: "flapple", type: "dragon", say: "flap ul", facts: [
    "Apple skins on its cheeks flap so it can flutter.",
    "Apple skin on its cheeks flaps like wings.",
    "It flutters with a sour little face.",
    "The flaps are pieces of its old apple.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 1 kilograms.",
    "In the cartoon, you can spot Flapple in Showdown! The Paldea Elite Four.",
    "It grew up from Applin.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/1/13/Pomdrapi_sauvage_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a3/LH055_-_Pomdrapi_Bombe_Acide.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/flapple.jpg" },
  ] },
  { id: 842, name: "Appletun", slug: "appletun", type: "dragon", say: "apple tun", facts: [
    "A gooey apple pie shell covers this sweet dragon.",
    "A round body like a gooey apple pie.",
    "The back smells sweet and looks syrupy.",
    "It is the sweet, heavy form of the apple worm.",
    "From head to toe it is about 40 centimeters.",
    "It weighs about 13 kilograms.",
    "In the cartoon, you can spot Appletun in The Bittersweet Truth.",
    "It grew up from Applin.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/8/8f/LH019_-_Dratatin_Acide_Malique.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/5b/Dratatin_de_la_Team_Rocket.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/appletun.jpg" },
  ] },
  { id: 884, name: "Duraludon", slug: "duraludon", type: "dragon", say: "duh, ral uh don", facts: [
    "A tall metal head makes it look a bit like a building.",
    "A tall metal head like a building.",
    "Its body is shiny and hard.",
    "It stands straight, the way a tower does.",
    "From head to toe it is about 1.8 meters.",
    "It weighs about 40 kilograms.",
    "In the cartoon, Duraludon first shows up in Toughing It Out!.",
    "When it grows up, it can become Archaludon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/fd/Duralugon_Abattage.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/c/c1/Duralugon_Griffe_Acier.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/duraludon.jpg" },
  ] },
  { id: 885, name: "Dreepy", slug: "dreepy", type: "dragon", say: "dree pee", facts: [
    "A tiny ghost dragon floats with its little arms out.",
    "A tiny ghost dragon with little arms out.",
    "It floats like a dart.",
    "It likes to hide near a bigger friend.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 2 kilograms.",
    "In the cartoon, you can spot Dreepy in The Winding Path to Greatness!.",
    "When it grows up, it can become Drakloak.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/4/43/Fantyrm_de_Dresseur_-_Film_23.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/2/2d/LV092_-_Fantyrm.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/dreepy.jpg" },
  ] },
  { id: 886, name: "Drakloak", slug: "drakloak", type: "dragon", say: "drak cloak", facts: [
    "A baby Dreepy rides safe between the horns on its head.",
    "A Dreepy rides between the horns on its head.",
    "It gets sad if that little rider is missing.",
    "The cloak of its body looks like a jet.",
    "From head to toe it is about 1.4 meters.",
    "It weighs about 11 kilograms.",
    "In the cartoon, Drakloak first shows up in The Winding Path to Greatness!.",
    "It grows up from Dreepy, and it can still grow into Dragapult.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0d/LV092_-_Dispareptil.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/drakloak.jpg" },
  ] },
  { id: 887, name: "Dragapult", slug: "dragapult", type: "dragon", say: "drag uh pult", facts: [
    "The horns on its head can launch little dragons like darts.",
    "Horns on its head can launch little dragons.",
    "It looks like a stealth jet with a face.",
    "The little riders shoot out like darts.",
    "From head to toe it is about 3 meters.",
    "It weighs about 50 kilograms.",
    "In the cartoon, Dragapult first shows up in Sword and Shield: The Darkest Day!.",
    "It grew up from Drakloak.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/3/30/LV100_-_Lanssorien_de_Tarak.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/0a/Lanssorien_Draco-Queue.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/dragapult.jpg" },
  ] },
  { id: 895, name: "Regidrago", slug: "regidrago", type: "dragon", say: "rej ee, drah go", facts: [
    "Glowing dragon orbs spin around the crystals on its fists.",
    "A crystal ball for a head and energy in its fists.",
    "Glowing dragon orbs spin around its hands.",
    "The orbs are bits of dragon power.",
    "From head to toe it is about 2.1 meters.",
    "It weighs about 200 kilograms.",
    "In the cartoon, Regidrago first shows up in Chasing to the Finish!.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/7/75/Regidrago_de_R%C3%A9gis.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/b/ba/Regidrago_Draco-%C3%89nergie.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/regidrago.jpg" },
  ] },
  { id: 967, name: "Cyclizar", slug: "cyclizar", type: "dragon", say: "sigh kli zar", facts: [
    "A wheel in its chest and a seat on its back are made for a rider.",
    "A wheel in its chest and a seat on its back.",
    "People have ridden it like a bike for a long time.",
    "The tail helps it steer.",
    "From head to toe it is about 1.6 meters.",
    "It weighs about 63 kilograms.",
    "In the cartoon, you can spot Cyclizar in Crash! Team Dragon Rampage!.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/9/97/LH009_-_Motorizard.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/6/62/LH071_-_Motorizard_de_Bruyer.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/cyclizar.jpg" },
  ] },
  { id: 978, name: "Tatsugiri", slug: "tatsugiri", type: "dragon", say: "tot soo gee ree", facts: [
    "This curly little dragon looks just like a piece of sushi.",
    "A curly little dragon that looks like sushi.",
    "A smile peeks out of the roll.",
    "It is tiny, but it bosses bigger friends around.",
    "From head to toe it is about 30 centimeters.",
    "It weighs about 8 kilograms.",
    "In the cartoon, Tatsugiri first shows up in Into a New Sky! The Brave Olivine!.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/f1/LH068_-_Nigirigon.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/tatsugiri.jpg" },
  ] },
  { id: 996, name: "Frigibax", slug: "frigibax", type: "dragon", say: "fri juh bax", facts: [
    "A fin on its head helps this chilly dragon stay cool.",
    "A fin of ice on a small dragon's head.",
    "It likes cold places and cool shade.",
    "The fin helps it stay chilly.",
    "From head to toe it is about 50 centimeters.",
    "It weighs about 17 kilograms.",
    "In the cartoon, Frigibax first shows up in Roy and Fuecoco's First Snow!.",
    "When it grows up, it can become Arctibax.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a9/LH060_-_Frigodo.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/frigibax.jpg" },
  ] },
  { id: 997, name: "Arctibax", slug: "arctibax", type: "dragon", say: "ark tuh bax", facts: [
    "Ice wraps its fins like a suit of frozen armor.",
    "Ice wraps its face and fins like frozen armor.",
    "It slides on the ice it makes.",
    "The armor is thicker than the little fin.",
    "From head to toe it is about 80 centimeters.",
    "It weighs about 30 kilograms.",
    "In the cartoon, Arctibax first shows up in Shine on, Terastallization! Liko vs. Roy!.",
    "It grows up from Frigibax, and it can still grow into Baxcalibur.",
  ], pics: [
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/arctibax.jpg" },
  ] },
  { id: 998, name: "Baxcalibur", slug: "baxcalibur", type: "dragon", say: "bak, ska luh burr", facts: [
    "A huge axe made of ice folds out from its back.",
    "A huge axe of ice folds out from its back.",
    "It can blast that icy axe forward.",
    "It walks tall, like a frozen knight.",
    "From head to toe it is about 2.1 meters.",
    "It weighs about 210 kilograms.",
    "In the cartoon, Baxcalibur first shows up in Showdown! The Paldea Elite Four.",
    "It grew up from Arctibax.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/0/08/LH055_-_Glaivodo_Blizzard.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/baxcalibur.jpg" },
  ] },
  { id: 1007, name: "Koraidon", slug: "koraidon", type: "dragon", say: "koh, rye don", facts: [
    "This ancient red lizard races on wheels like a feathered bike.",
    "A red ancient lizard with feathers and wheels.",
    "It races as if it were a feathered bike.",
    "The wheels are part of its legs.",
    "From head to toe it is about 2.5 meters.",
    "It weighs about 303 kilograms.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/5/55/LH148_-_Koraidon.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/a0/LV137_-_Introduction_de_Koraidon.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/koraidon.jpg" },
  ] },
  { id: 1008, name: "Miraidon", slug: "miraidon", type: "dragon", say: "meer, rye don", facts: [
    "This future purple lizard glides on wheels full of electricity.",
    "A purple future lizard with electric wheels.",
    "It glides and sparks while it rides.",
    "The wheels glow when it speeds up.",
    "From head to toe it is about 3.5 meters.",
    "It weighs about 240 kilograms.",
    "This is its only form, and it does not grow into a different Pokémon.",
  ], pics: [
    { label: "Animated series", url: "https://www.pokepedia.fr/images/a/ad/LH148_-_Miraidon.png" },
    { label: "Animated series", url: "https://www.pokepedia.fr/images/f/ff/LV138_-_Introduction_de_Miraidon.png" },
    { label: "Big artwork", url: "https://img.pokemondb.net/artwork/large/miraidon.jpg" },
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

// Home art on this host is the fallback if the big official picture fails to load.
const SHOWDOWN_SPRITES = "https://play.pokemonshowdown.com/sprites";

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

// Extra pictures only: high-resolution artwork and real series stills. The hero stays the official full art.
function galleryPictures(poke) {
  return poke.pics || [];
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
        <p class="modal-credit">Extra pictures from Pokémon DB. Series scenes from Poképédia.</p>
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
