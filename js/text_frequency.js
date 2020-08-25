function TextFrequency(id) {
  this.id = id;
  this.ignoreWords = [ "the", "and", "are", "this", "then", "they", "there", "be", "been", "have", "where", "why", "how", "when", "you", "can", "not", "from", "them", "may", "for", "with", "that", "into", "their", "was", "were", "is", "am"];
  //this.getIgnoreWords();
}

TextFrequency.prototype.getIgnoreWords = function() {
  //readTextFile("ignoreWords.txt");
}

/**
 * Determine the most frequent words in given text and renders it.
 */
TextFrequency.prototype.execute = function(data, maxNumOfWords) {
  if (data == null || data.trim().length == 0) return;
  data = data.split(/[.,\/#^{}()=\s]/g);

  // Build a map of all the words and how often they appear in the text.
  let frequencyMap = {};
  let order = 0;
  for (let i = 0; i < data.length; i++) {
    let word = data[i].trim().toLowerCase();
    if (word.length < 3 || this.ignoreWords.indexOf(word) >= 0) continue;

    if (frequencyMap[word] == null) {
      frequencyMap[word] = {
        count: 0,
        order: order++,
        word: word
      };
    }

    frequencyMap[word].count++;
  }

  // Sort to find the top N most frequent words.
  let frequencies = Object.values(frequencyMap);
  frequencies.sort((a, b) => b.count - a.count);

  let list = [];
  let maxFrequency = 0;
  for (let i = 0; i < frequencies.length && list.length < maxNumOfWords; i++) {
    if (frequencies[i].count > 1) {
      if (maxFrequency == 0)  maxFrequency = frequencies[i].count;
      list.push(frequencies[i]);
    }
  }

  // Sort it back to the order the word was originally found in the text.
  list.sort(function(a, b) {
    return a.order - b.order;
  });

  this.render(list, maxFrequency);
}

/**
 * Renders the list of words that occurs most frequenctly.
 */
TextFrequency.prototype.render = function(list, maxFrequency) {
  let element = document.getElementsByClassName(this.id);
  if (element == null || element.length == 0) return;

  let html = "";
  for (let i = 0; i < list.length; i++) {
    let percentage = list[i].count/maxFrequency;

    // Calculate font size relative to max frequency.
    // Large font size is 28pt.
    let fontSize = Math.floor(percentage * 28);
    if (fontSize < 14) {
      fontSize = 14;
    }

    // Calculate font weight relative to max frequency.
    let fontWeight = 300;
    if (percentage >= 0.75) {
      fontWeight = 600;
    }
    else if (percentage >= 0.5) {
      fontWeight = 500;
    }
    else if (percentage >= 0.25) {
      fontWeight = 400;
    }

    html += "<div style='font-size: " + fontSize + "pt; font-weight: " + fontWeight + ";'>"
         + list[i].word + "</div>";
  }

  element[0].innerHTML = html;
}
