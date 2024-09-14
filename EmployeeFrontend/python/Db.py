
from sqlalchemy import Column, Integer, ForeignKey, String



class Employee(db.Model):
    __tablename__  = "tbl_employee"
    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String, nullable=True),
    location = Column(String, nullable = True)
    code = Column(String, nullable=True)
    role_id = Column(String, ForeignKey("tbl_roles.id"), nullable=False) 
    
    db.create_all()
  
    def add_employee(request):
        try:
            name = request.form.get("name")
            code = request.form.get("code")
            location = request.form.get("location")
            role_id = request.form.get("roleId")
            
            db.session.add(Employee(
                name=name,
                code=code,
                location = location,
                role_id = role_id
            ))
            
            db.session.commit()
            return {"msg" :"successfully employee added"}
        except Exception as e:
            print(f"error occured {e}")