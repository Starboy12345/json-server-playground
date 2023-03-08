describe('', function() {


  it('should verify the status', function() {
    cy.request('GET','http://localhost:3000/posts').then((res)=>{
      cy.log(JSON.stringify(res))
      expect(res.status).to.be.equal(200);
      expect(res.body).is.an('array');
    })

  })

  it('should verify keys ', function() {

    cy.request(
      {method:'GET',url:'http://localhost:3000/posts',headers:{accept:'application/json'}})
      .then((response)=>{
        let body = JSON.parse(JSON.stringify(response.body));
        expect(body[0]).has.property("id")
        body.forEach(function(item){
          expect(item).to.have.all.keys("id","title","author");
          cy.log("id is " + item['id'] +" title is "+ item['title'] +" author is "+ item['author']);
        })
    })

  })
})