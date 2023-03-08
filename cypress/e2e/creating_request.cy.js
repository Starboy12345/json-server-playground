/// <reference types="cypress" />

describe('API testing "Get request"',()=>{
  var result;
  it('should validate status code of Post request', function() {

    result=cy.request("http://localhost:3000/posts");
      result.its('status').should('equal',200)
    
  })

  it('should validate keys and value in request',()=>{

    cy.request({method:"GET",
    url:"http://localhost:3000/posts",
    headers:{
      accept:"application/json"
    }}).then((response)=>{
      let body =JSON.parse(JSON.stringify(response.body))
      cy.log(body)

      expect(body[0].has.property())


    })

    cy.intercept({method:'GET',url:"**/",headers:{
      type:'application/json'
      },
    body:{

    }},{
      body:{

      }

    })


  })


})
