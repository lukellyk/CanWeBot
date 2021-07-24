//cheems translation logic taken from https://cheems.mirazmac.com/

module.exports = {
	name: 'cheems',
	description: 'makimg yuor temxt bemtter',
	execute(message, args) {
        
        if (/^[0-9]{18}$/.test(args[0])) 
        {
            // args is a message ID
            console.log("translating message from ID");

            message.channel.messages.fetch(args[0])
            .then(async message => {
                try {
                    var english = message.content.toString();
                    message.channel.send("\<:cheems:868383198130864138:>: " + englishToCheems(english));
                } catch (error) {
                    console.error('Failemd to tramslamte: ', error);
                }
            })
            
            message.delete()
                .then(msg => console.log(`Deleted command message from ${msg.author.username}`))
                .catch(console.error);
        } else 
        {
            // args is text to be translated
            console.log("Tramslatimg imput: ", args.join(" "));

            var english = args.join(" ").toString();
            message.channel.send("\<:cheems:868383198130864138:>: " + englishToCheems(english));
            
            message.delete()
                .then(msg => console.log(`Deleted command message from ${msg.author.username}`))
                .catch(console.error);
        }

        // var holyWords = {
        //     burger: 'burmger',
        //     bad: 'bamd',
        //     batman: 'bamtman',
        //     cheese: 'cheems',
        //     cheems: 'cheems',
        //     cheeseburger: 'cheemsburger',
        //     doge : 'domge',
        //     female: 'f*male',
        //     history: 'himstory',
        //     woman: 'w*man',
        //     women: 'w*men',
        //     walter: 'walmter',
        // };

        function englishToCheems(text)
        {
            // sorry kimg but no line breakms
            text = text.toString().replace(/(\r\n|\n|\r)/gm, " ");

            // Explode them words
            var words = text.split(" ");
            var cheemedText = [];

            var symbols = [',', '.', ':', '!', '?', '&', '%', '/'];

            for (var i = words.length - 1; i >= 0; i--) {
                // Get rid of extra spaces
                var word = words[i].trim();

                var needLastCharater = false;

                var lastChar = word.charAt(word.length - 1);

                if (symbols.includes(lastChar)) {
                    word = word.slice(0, -1);
                    needLastCharater = true;
                }
                
                // // Handle basic plurals
                // if (lastChar == 's') {
                //     var withoutS = word.slice(0, -1);

                //     if (holyWords[withoutS]) {
                //         word = holyWords[withoutS] + 's';
                //         cheemedText[i] = word;
                //         continue;
                //     }
                // }

                // if (holyWords[word]) {
                //     word = holyWords[word];
                // } else {
                //     word = cheemsAlgorithm(word);
                // }

                word = cheemsAlgorithm(word);

                if (needLastCharater) {
                    word = word + lastChar;
                }

                cheemedText[i] = word;
            }

            return cheemedText.join(' ');
        }

        function cheemsAlgorithm(word)
        {
            if (word.length < 4) {
                return word;
            }

            var vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

            var vowelCount = word.match(/[aeiouAEIOU]/gi);
            vowelCount = vowelCount === null ? 0 : vowelCount.length;

            var newWord = [];
            var addedM = false;
            var lastChar = word.charAt(word.length - 1);

            for (i = 0; i < word.length; i++) {
                var char = word.charAt(i);

                if (i > 0 && addedM == false) {
                    if (vowelCount > 1 && i == 1 && vowels.includes(char) && !vowels.includes(lastChar)) {
                        newWord[i] = char;
                        continue;
                    }

                    var prev = word.charAt(i - 1);
                    var next = word.charAt(i + 1);

                    if (vowels.includes(char) && next != ('m' || 'M') && prev != ('m' || 'M') && !vowels.includes(next)) {
                        char = char + /* Account for caps --> */(char == char.toUpperCase() ? 'M' : 'm');

                        addedM = true;
                    }
                }

                if (newWord[i] == undefined) {
                    newWord[i] = char;
                }
            }

            return newWord.join('');
        }
	}
};

