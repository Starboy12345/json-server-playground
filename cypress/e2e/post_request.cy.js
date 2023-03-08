let randomtitle = (Math.random() + 1).toString(36).substring(7);
describe('post request valiateion', function() {
  it('should verify status code of Post request', function() {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/posts',
      body: { "title": "my latest post", "author": "Florent" }
    }).then(function(response) {
      expect(response.status).to.eq(201);
    })
  })

  it('should validate last post request title(method 1)', function() {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/posts',
      body: { "title": randomtitle, "author": "Florent" }
    }).then(function(response) {
      const body = JSON.parse(JSON.stringify(response.body))
      expect(body.title).to.eq(randomtitle);

    })
  })

  it('should validate last post request title(method 2)-iterating through all get requests', function() {
    let titles =new Array();
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/posts',
      headers:{accept :'applcation/json'}
    }).then(function(response) {
      const body = JSON.parse(JSON.stringify(response.body))
      body.forEach(function(item){
        titles.push(item.title); // remember to always push value in aray otherwise it doesnt work
      })
    }).then(function(){
      cy.log(`The last title is :${titles[titles.length -1]}`);
      let lastvalue =`${titles[titles.length -1]}`
      expect(lastvalue).to.be.eq(randomtitle);
    })
  })

  it.skip('should validate last post request title(method 3)-iterating through using for loops', function() {
    let titles =new Array();
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/posts',
      headers:{accept :'applcation/json'}
    }).then(function(response) {
      const body = JSON.parse(JSON.stringify(response.body))
      //cy.log(body)

      for(let i=0;i<body.length;i++){
        titles =body[i].title;
        cy.log("The value of title "+i+ " is: "+ titles)
        let lastvalue =titles[i];
        expect(lastvalue).to.be.eq(randomtitle);
      }

    })

  })

})