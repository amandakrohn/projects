import requests
from bs4 import BeautifulSoup

URL = 'https://www.dn.se'
headers = { 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0' }

def findNews():
    article_url = findTeaser()
    findArticle(article_url)

def findTeaser():
    page = requests.get(URL, headers=headers)
    soup = BeautifulSoup(page.content, 'html.parser')

    teaser_content = soup.find(class_='teaser__content')
    p_children = teaser_content.findChildren('p', recursive=False)
    title_children = teaser_content.findChildren('h1', recursive=False)

    children_lst = []
    for c in title_children:
        children_lst.append(c.get_text().strip())

    for c in p_children:
        children_lst.append(c.get_text().strip())

    print(children_lst[0])
    print(children_lst[1])

    article = soup.findAll('a', class_='teaser', href=True)

    return  URL + article[0]['href']

def findArticle( ARTICLE_URL ):
    article_page = requests.get(ARTICLE_URL, headers=headers)
    article_soup = BeautifulSoup(article_page.content, 'html.parser')

    content = article_soup.find(class_='article__lead').get_text().strip()
    print(content)

def main():
    findNews()

if __name__ == "__main__":
    main()