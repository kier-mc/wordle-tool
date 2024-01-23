import os, json
from collections import Counter

working_directory = os.getcwd()

def generate_data() -> dict[str, dict]:
  '''
  Generates a dictionary intended for export as JSON using data from two separate files:

    - A list of words that Wordle accepts as valid input.
    - A list of words that represent possible solutions to Wordle problems. 
  
  The dictionary key is the current word being iterated over, and the value is an object that contains parameterised
  information related to the word.

  Word data sourced from https://github.com/Kinkelin/WordleCompetition/tree/main/data/official
  '''

  filename_complete_list: str = "complete-list"
  filename_solution_list: str = "solution-list"
  payload: list[dict] = []

  '''
  Returns a boolean indicating whether or not the word has duplicate letters.
  '''
  def has_duplicate_letters(data: dict[str, int]) -> bool:
    count_data = data["metrics"]["letter_count"]
    return any (count > 1 for count in count_data.values())
  '''
  Returns a boolean indicating whether or not a letter is a vowel.
  '''
  def is_vowel(letter: str) -> bool:
    return letter in ["a", "e", "i", "o", "u"]
  
  with open(os.path.join(working_directory + "/scripts/input/", f"{filename_complete_list}.json"), "r") as file_complete_list:
    with open(os.path.join(working_directory + "/scripts/input/", f"{filename_solution_list}.json"), "r") as file_solution_list:
      complete_list: tuple[str] = tuple(json.load(file_complete_list))
      solution_list: tuple[str] = tuple(json.load(file_solution_list))

      for word in complete_list:
        data = {
          "term": word,
          "metrics": {
            "has_duplicate_letters": False,
            "is_potential_solution": False,
            "consonants": 0,
            "vowels": 0,
            "letter_count": Counter(word),         
          }            
        }
        metrics = data["metrics"]
        for letter in word:
          metrics["vowels" if is_vowel(letter) else "consonants"] += 1
        metrics["is_potential_solution"] = True if word in solution_list else False
        metrics["has_duplicate_letters"] = True if has_duplicate_letters(data) else False
        payload.append(data)

  return payload

def write_to_file(data: dict[str, dict]) -> None:
  '''
  Parses generated data and writes it to prettified JSON format. Requires a dictionary object as a parameter.
  '''
  filename_output = "dataset"

  with open(os.path.join(working_directory + "/scripts/output/", f"{filename_output}.json"), "w", encoding="utf-8") as file_output:
    json.dump(data, file_output, indent=2, ensure_ascii=False)

if (__name__ == "__main__"):
    data = generate_data()
    write_to_file(data)