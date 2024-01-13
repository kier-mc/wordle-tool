import os, json
from collections import Counter

working_directory = os.getcwd()

def generate_data() -> dict[str, dict]:
  '''
  Generates a dictionary intended for export as JSON using data from three separate files:

    - Weighting data[1] that contains numerical values representing a "score" for each letter of the alphabet.
    - A list of words[2] that Wordle accepts as valid input.
    - A list of words[2] that represent possible solutions to Wordle problems. 
  
  The dictionary key is the current word being iterated over, and the value is an object that contains parameterised
  information related to the word.

  [1] https://premium-oxforddictionaries-com.libproxy.ucl.ac.uk/words/which-letters-are-used-most
  [2] https://github.com/Kinkelin/WordleCompetition/tree/main/data/official
  '''
  filename_weighting: str = "weighting"
  filename_complete_list: str = "complete-list"
  filename_solution_list: str = "solution-list"
  payload: dict[str, dict] = {}

  def is_vowel(letter: str) -> bool:
    return letter in ["a", "e", "i", "o", "u"]

  def has_duplicate_letters(word: str):
    return any (count > 1 for count in Counter(word).values())

  def is_potential_solution(word: str, solution_list: tuple[str]):
    return word in solution_list

  with open(os.path.join(working_directory + "/scripts/input/", f"{filename_weighting}.json"), "r") as file_weighting:
    weighting: dict[str, int] = json.load(file_weighting)
    with open(os.path.join(working_directory + "/scripts/input/", f"{filename_complete_list}.json"), "r") as file_complete_list:
      with open(os.path.join(working_directory + "/scripts/input/", f"{filename_solution_list}.json"), "r") as file_solution_list:
        complete_list: tuple[str] = tuple(json.load(file_complete_list))
        solution_list: tuple[str] = tuple(json.load(file_solution_list))

        for word in complete_list:
          data = {
            "composition": {
              "consonants": 0,
              "vowels": 0,
              "letter_count": Counter(word)
            },
            "letter_score": 0,          
            "is_potential_solution": True if is_potential_solution(word, solution_list) else False,
            "has_duplicate_letters": True if has_duplicate_letters(word) else False,
          }
          for letter in word:
            data["letter_score"] += weighting[letter]
            data["composition"]["vowels" if is_vowel(letter) else "consonants"] += 1
          payload[word] = data

  return payload

def write_to_file(data: dict[str, dict]) -> None:
  '''
  Parses generated data and writes it to prettified JSON format. Requires a dictionary object as a parameter.
  '''
  filename_output = "data"

  with open(os.path.join(working_directory + "/scripts/output/", f"{filename_output}.json"), "w", encoding="utf-8") as file_output:
    json.dump(data, file_output, indent=2, ensure_ascii=False)

if (__name__ == "__main__"):
    data = generate_data()
    write_to_file(data)