const puppeteer = require('puppeteer');

class InstagramBot {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.browser = null;
    this.page = null;
  }

  async launch() {
    this.browser = await puppeteer.launch({ 
      headless: false, // mettre true en production
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    this.page = await this.browser.newPage();
    await this.page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });
    // Attente du formulaire
    await this.page.waitForSelector('input[name="username"]');
    await this.page.type('input[name="username"]', this.username, { delay: 100 });
    await this.page.type('input[name="password"]', this.password, { delay: 100 });
    await this.page.click('button[type="submit"]');
    await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log('✅ Connecté à Instagram');
  }

  async respondToComments(triggerWord, responseText) {
    // Aller sur la page de profil pour récupérer les dernières publications
    await this.page.goto(`https://www.instagram.com/${this.username}/`, { waitUntil: 'networkidle2' });
    // Cliquer sur la première publication
    await this.page.waitForSelector('article a');
    await this.page.click('article a');
    await this.page.waitForSelector('ul li ul li', { timeout: 10000 });

    // Récupérer les commentaires
    const comments = await this.page.$$eval('ul li ul li span', spans => spans.map(s => s.textContent));
    // Filtrer ceux qui contiennent le mot-clé
    const matchingComments = comments.filter(c => c.toLowerCase().includes(triggerWord.toLowerCase()));
    if (matchingComments.length === 0) return;

    // Pour chaque commentaire correspondant, répondre
    // (simplifié : on répond au premier trouvé)
    // Ouvrir la zone de commentaire
    await this.page.click('textarea[aria-label="Ajouter un commentaire..."]');
    await this.page.type('textarea', responseText, { delay: 50 });
    await this.page.click('button[type="submit"]');
    console.log(`✅ Réponse envoyée à un commentaire contenant "${triggerWord}"`);
  }

  async close() {
    if (this.browser) await this.browser.close();
  }
}

module.exports = InstagramBot;
