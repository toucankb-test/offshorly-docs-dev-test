# Testing  

This is a sample selenium test script for TestCase-1808

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
import time
import difflib

options = webdriver.ChromeOptions()
chrome_options = Options()
chrome_options.add_experimental_option("detach",True)
driver = webdriver.Chrome(options=chrome_options)
driver.maximize_window()
driver.get("https://kb-frontend-git-staging-clarence-coronels-projects-f9df158c.vercel.app/?page=1")
wait = WebDriverWait(driver, 5)
print("To verify that combining language selection with keywords works correctly")


search = driver.find_element(By.XPATH, "/html[1]/body[1]/div[1]/main[1]/div[1]/form[1]/div[1]/div[1]/input[1]")
search.send_keys("testi")
enter = driver.find_element(By.XPATH, "//button[@class='max-md:min-w-12 disabled:bg-neutral-400 hover:bg-green-600 min-w-28 flex justify-center rounded-md bg-green-500 items-center h-full p-1.5 duration-200 text-white']")
enter.click()
time.sleep(2)

result = 0
try:
    elements = wait.until(EC.presence_of_all_elements_located((By.XPATH, "/html/body/div/main")))
    all_text = "\n".join(element.text for element in elements if element.text.strip())
except:
    print("TC-1804: Failed")
    driver.quit()
else:
    if all_text.count("Testing") >> 0:
        print("TC-1804: Success")
        driver.quit()

```
