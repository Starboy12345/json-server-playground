let idarray =new Array();
describe('Delete a request', function() {
  it('should delete a request and status code is 200', function() {

    cy.request(
      {method:'GET',url:'http://localhost:3000/posts',headers:{accept:'application/json'}})
      .then((response)=>{
        let body = JSON.parse(JSON.stringify(response.body));
        expect(body[0]).has.property("id")
        body.forEach(function(item){
          idarray.push(item.id);
        })
      }).then(function(){
      cy.request({
        method: 'DELETE',
        url: `http://localhost:3000/posts/${idarray[0]}`,
      }).then(function(response) {
        expect(response.status).to.eq(200);
      })
    })

  })

  it('should delete a request and verify that body is empty', function() {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:3000/posts/${idarray[1]}`,
    }).then(function(response) {
      let body =JSON.parse(JSON.stringify(response.body))
      expect(body).to.be.empty;
    })

  })

})