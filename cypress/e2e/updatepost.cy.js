let randomauthor = (Math.random() + 1).toString(36).substring(7);
describe('Updating a post', function() {
  it('should update a post', function() {
    cy.request({
      method: 'PUT',
      url: 'http://localhost:3000/posts/3',
      body:  { "author": "Florent houetchekpo " }
    }).then(function(response) {
      expect(response.status).to.eq(200);
    })
  })

  it('should verify that body of post is as expected', function() {
    cy.request({
      method: 'PUT',
      url: 'http://localhost:3000/posts/3',
      body:  { "author": randomauthor }
    }).then(function(response) {
      let bodyresponse =JSON.parse(JSON.stringify(response.body))
      expect(bodyresponse.author).to.eq(randomauthor);
    })
  })

})