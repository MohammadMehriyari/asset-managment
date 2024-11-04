
# Asset Operation App API's:

## Creation And List Os OperationSystem API

paths:

  * /asset/operation-system/:
    * get:
      * summary: Retrieve a list of operation systems
      * description: Returns a list of operation systems with their details. Only accessible by admin users.
      * tags:
        * Operation Systems
      * responses:
        * '200':
          * description: A list of operation systems
          * content:
            * application/json 
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/OperationSystem'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []
    * post:
      * summary: Create a new operation system
      * description: Creates a new operation system. Only accessible by admin users.
      * tags:
        * Operation Systems
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/OperationSystem'
      * responses:
        * '201':
          * description: Operation system created successfully
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/OperationSystem'
        * '400':
          * description: Bad request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []

        
components:

  * schemas:
    * OperationSystem:
      * type: object
      * properties:
        * operationsystemid:
          * type: integer
          * readOnly: true
        * operationsystemname:
          * type: string
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * operationsystemcreatetime:
          * type: string
          * format: date-time
          * readOnly: true
        * operationsystemupdatetime:
          * type: string
          * format: date-time
          * readOnly: true
        * operationversions:
          * type: array
          * items:
            * $ref: '#/components/schemas/OperationSystemVersion'
    * OperationSystemVersion:
      * type: object
      * properties:
        * versionid:
          * type: integer
        * versionname:
          * type: string
* ___
## Detail, Update, Destroy OperationSystem API

paths:

  * /asset/operation-system/{pk}/:
    * get:
      * summary: Retrieve details of an operating system
      * description: Returns the details of a specific operating system by its ID. Only users with admin permissions can access this endpoint.
      * operationId: getOperationSystem
      * tags:
        * Operating Systems
      * security:
        * JWTAuth: []
      * parameters:
        * name: pk
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the operating system to retrieve
      * responses:
        * '200':
          * description: An operating system object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/OperationSystem'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not found
        * '500':
          * description: Internal server error
    * put:
      * summary: Update an existing operating system
      * description: Updates the details of a specific operating system by its ID. Only users with admin permissions can access this endpoint.
      * operationId: updateOperationSystem
      * tags:
        * Operating Systems
      * security:
        * JWTAuth: []
      * parameters:
        * name: pk
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the operating system to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/OperationSystem'
      * responses:
        * '200':
          * description: Operating system updated successfully
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/OperationSystem'
        * '400':
          * description: Bad request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not found
        * '500':
          * description: Internal server error
    * delete:
      * summary: Delete an existing operating system
      * description: Deletes a specific operating system by its ID. Only users with admin permissions can access this endpoint.
      * operationId: deleteOperationSystem
      * tags:
        * Operating Systems
      * security:
        * JWTAuth: []
      * parameters:
        * name: pk
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the operating system to delete
      * responses:
        * '204':
          * description: Operating system deleted successfully
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not found
        * '500':
          * description: Internal server error
        
components:

  * securitySchemes:
    * JWTAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT
  * schemas:
    * OperationSystem:
      * type: object
      * properties:
        * operationsystemid:
          * type: integer
          * example: 1
        * operationsystemname:
          * type: string
          * example: "Windows 10"
        * createruserid:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * operationsystemcreatetime:
          * type: string
          * format: date-time
          * example: "2023-09-06T11:07:49Z"
        * operationsystemupdatetime:
          * type: string
          * format: date-time
          * example: "2023-09-06T11:07:49Z"
        * operationversions:
          * type: array
          * items:
            * type: string
            * example: "Version 1.0"
* ___
## Creation and List Of OperationSystemVersion API

paths:

  * /asset/operation-system-version/:
    * get:
      * summary: List Operation System Versions
      * description: Retrieve a list of all operation system versions. Requires admin permissions.
      * responses:
        * '200':
          * description: Successful response
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/OperationSystemVersion'
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden Admin permissions are required
        * '500':
          * description: Internal Server Error
    * post:
      * summary: Create a new Operation System Version
      * description: Add a new operation system version. Requires admin permissions.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/OperationSystemVersion'
      * responses:
        * '201':
          * description: Successful creation
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/OperationSystemVersion'
        * '400':
          * description: Invalid input
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden Admin permissions are required
        * '500':
          * description: Internal Server Error
        
components:

  * schemas:
    * OperationSystemVersion:
      * type: object
      * properties:
        * operationsystemversionid:
          * type: integer
        * operationsystemversionname:
          * type: string
        * createruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * operationsystemversioncreatetime:
          * type: string
          * format: date-time
        * operationsystemversionupdatetime:
          * type: string
          * format: date-time
        * osId:
          * type: integer
          * writeOnly: true
* ___
## Detail, Update, Destroy OperationSystemVersion API
 
paths:

  * /asset/operation-system-version/{pk}/:
    * get:
      * summary: Retrieve an Operation System Version
      * description: Fetch details of a specific operation system version by its ID. Requires admin permissions.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The ID of the operation system version to retrieve.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: Successful response
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/OperationSystemVersion'
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden Admin permissions are required
        * '404':
          * description: Operation system version not found
        * '500':
          * description: Internal Server Error
    * put:
      * summary: Update an Operation System Version
      * description: Update details of a specific operation system version by its ID. Requires admin permissions.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The ID of the operation system version to update.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/OperationSystemVersion'
      * responses:
        * '200':
          * description: Successful update
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/OperationSystemVersion'
        * '400':
          * description: Invalid input
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden Admin permissions are required
        * '404':
          * description: Operation system version not found
        * '500':
          * description: Internal Server Error
    * delete:
      * summary: Delete an Operation System Version
      * description: Delete a specific operation system version by its ID. Requires admin permissions.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The ID of the operation system version to delete.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: Successful deletion
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden Admin permissions are required
        * '404':
          * description: Operation system version not found
        * '500':
          * description: Internal Server Error
        
components:

  * schemas:
    * OperationSystemVersion:
      * type: object
      * properties:
        * operationsystemversionid:
          * type: integer
        * operationsystemversionname:
          * type: string
        * createruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * operationsystemversioncreatetime:
          * type: string
          * format: date-time
        * operationsystemversionupdatetime:
          * type: string
          * format: date-time
        * osId:
          * type: integer
          * writeOnly: true
* ___
## Creation And List Computer API

paths:

  * /asset/computer/:
    * get:
      * summary: List Computers
      * description: Retrieve a list of all computers. Requires admin permissions.
      * responses:
        * '200':
          * description: Successful response
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/Computer'
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden Admin permissions are required
        * '500':
          * description: Internal Server Error
    * post:
      * summary: Create a new Computer
      * description: Add a new computer. Requires admin permissions.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Computer'
      * responses:
        * '201':
          * description: Successful creation
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Computer'
        * '400':
          * description: Invalid input
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden Admin permissions are required
        * '500':
          * description: Internal Server Error

components:

  * schemas:
    * Computer:
      * type: object
      * properties:
        * computerpropertynumber:
          * type: string
        * computername:
          * type: string
        * computermodel:
          * type: string
        * computerip:
          * type: string
        * computermacaddress:
          * type: string
        * computerispersonal:
          * type: boolean
        * osVersionId:
          * type: integer
          * writeOnly: true
        * computercreatetime:
          * type: string
          * format: date-time
        * computerupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * operationsystemversionid:
          * type: object
          * properties:
            * operationsystemversionid:
              * type: integer
            * operationsystemversionname:
              * type: string
            * operationsystemname:
              * type: string
            * operationsystemversioncreatetime:
              * type: string
              * format: date-time
            * operationsystemversionupdatetime:
              * type: string
              * format: date-time
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
        * sealing:
          * type: object
          * properties:
            * computerseallingnumber:
              * type: string
            * isexpired:
              * type: boolean
        * relateddeliveredgoods:
          * type: array
          * items:
            * type: object
            * properties:
              * deliveredgoodsid:
                * type: integer
              * deliveredgoodsserial:
                * type: string
              * deliveredgoodscreatetime:
                * type: string
                * format: date-time
              * deliveredgoodsupdatetime:
                * type: string
                * format: date-time
        * isAbortion:
          * type: boolean
* ___
## Retrieve, Update, Destroy, Computer API
paths:

  * /asset/computer/{pk}/:
    * get:
      * summary: Retrieve a computer
      * description: Retrieve the details of a specific computer by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the computer to retrieve.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: A computer object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Computer'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * Computer
      * security:
        * bearerAuth: []
    * put:
      * summary: Update a computer
      * description: Update the details of a specific computer by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the computer to update.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Computer'
      * responses:
        * '200':
          * description: The updated computer object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Computer'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * Computer
      * security:
        * bearerAuth: []
    * delete:
      * summary: Delete a computer
      * description: Delete a specific computer by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the computer to delete.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * Computer
      * security:
        * bearerAuth: []

components:

  * schemas:
    * Computer:
      * type: object
      * properties:
        * computerpropertynumber:
          * type: string
        * computername:
          * type: string
        * computermodel:
          * type: string
        * computerip:
          * type: string
        * computermacaddress:
          * type: string
        * computerispersonal:
          * type: boolean
        * osVersionId:
          * type: integer
        * computercreatetime:
          * type: string
          * format: date-time
        * computerupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * operationsystemversionid:
          * type: object
          * properties:
            * operationsystemversionid:
              * type: integer
            * operationsystemversionname:
              * type: string
            * operationsystemname:
              * type: string
            * operationsystemversioncreatetime:
              * type: string
              * format: date-time
            * operationsystemversionupdatetime:
              * type: string
              * format: date-time
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
        * sealing:
          * type: object
          * properties:
            * computerseallingnumber:
              * type: string
            * isexpired:
              * type: boolean
        * relateddeliveredgoods:
          * type: array
          * items:
            * type: object
            * properties:
              * deliveredgoodsid:
                * type: integer
              * deliveredgoodsserial:
                * type: string
              * deliveredgoodscreatetime:
                * type: string
                * format: date-time
              * deliveredgoodsupdatetime:
                * type: string
                * format: date-time
        * isAbortion:
          * type: boolean
* ___
## List, Create AttributeCategory API

paths:

  * /asset/attribute-categoty/:
    * get:
      * summary: List all attribute categories
      * description: Retrieve a list of all attribute categories. Only accessible by admin users.
      * responses:
        * '200':
          * description: A list of attribute categories
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/AttributeCategory'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * AttributeCategory
      * security:
        * bearerAuth: []
    * post:
      * summary: Create a new attribute category
      * description: Create a new attribute category. Only accessible by admin users.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/AttributeCategory'
      * responses:
        * '201':
          * description: The created attribute category
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/AttributeCategory'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * AttributeCategory
      * security:
        * bearerAuth: []

components:

  * schemas:
    * AttributeCategory:
      * type: object
      * properties:
        * attributecategoryid:
          * type: integer
        * attributecategoryname:
          * type: string
        * attributecategorycreatetime:
          * type: string
          * format: date-time
        * attributecategoryupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## Retrieve, Update, Destroy, AttributeCategory API

paths:

  * /asset/attribute-categoty/{pk}/:
    * get:
      * summary: Retrieve an attribute category
      * description: Retrieve the details of a specific attribute category by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the attribute category to retrieve.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: An attribute category object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/AttributeCategory'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * AttributeCategory
      * security:
        * bearerAuth: []
    * patch:
      * summary: Update an attribute category
      * description: Update the details of a specific attribute category by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the attribute category to update.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/AttributeCategory'
      * responses:
        * '200':
          * description: The updated attribute category object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/AttributeCategory'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * AttributeCategory
      * security:
        * bearerAuth: []
    * delete:
      * summary: Delete an attribute category
      * description: Delete a specific attribute category by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the attribute category to delete.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * AttributeCategory
      * security:
        * bearerAuth: []

components:

  * schemas:
    * AttributeCategory:
      * type: object
      * properties:
        * attributecategoryid:
          * type: integer
        * attributecategoryname:
          * type: string
        * attributecategorycreatetime:
          * type: string
          * format: date-time
        * attributecategoryupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## Retrieve, Update, Destroy GoodsAttributes API

paths:

  * /asset/goods-attribute/{pk}/:
    * get:
      * summary: Retrieve a goods attribute
      * description: Retrieve the details of a specific goods attribute by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the goods attribute to retrieve.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: A goods attribute object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsAttributes'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsAttributes
      * security:
        * bearerAuth: []
    * patch:
      * summary: Update a goods attribute
      * description: Update the details of a specific goods attribute by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the goods attribute to update.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/GoodsAttributes'
      * responses:
        * '200':
          * description: The updated goods attribute object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsAttributes'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsAttributes
      * security:
        * bearerAuth: []
    * delete:
      * summary: Delete a goods attribute
      * description: Delete a specific goods attribute by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the goods attribute to delete.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsAttributes
      * security:
        * bearerAuth: []

components:

  * schemas:
    * GoodsAttributes:
      * type: object
      * properties:
        * goodsattributesid:
          * type: integer
        * goodsattributestitle:
          * type: string
        * goodsattributestype:
          * type: integer
        * goodsattributescreatetime:
          * type: string
          * format: date-time
        * goodsattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * defaultvalues:
          * type: array
          * items:
            * $ref: '#/components/schemas/GoodsAttributesDefaultValue'

    * GoodsAttributesDefaultValue:
      * type: object
      * properties:
        * goodsAttributesId:
          * type: integer
        * goodsattributesid:
          * type: integer
        * defaultattributes:
          * type: string
        * defaultattributescreatetime:
          * type: string
          * format: date-time
        * defaultattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## List, Create GoodsAttributes API

paths:

  * /asset/goods-attribute/:
    * get:
      * summary: List all goods attributes
      * description: Retrieve a list of all goods attributes. Only accessible by admin users.
      * responses:
        * '200':
          * description: A list of goods attributes
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/GoodsAttributes'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsAttributes
      * security:
        * bearerAuth: []
    * post:
      * summary: Create a new goods attribute
      * description: Create a new goods attribute. Only accessible by admin users.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/GoodsAttributes'
      * responses:
        * '201':
          * description: The created goods attribute
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsAttributes'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsAttributes
      * security:
        * bearerAuth: []

components:

  * schemas:
    * GoodsAttributes:
      * type: object
      * properties:
        * goodsattributesid:
          * type: integer
        * goodsattributestitle:
          * type: string
        * goodsattributestype:
          * type: integer
        * goodsattributescreatetime:
          * type: string
          * format: date-time
        * goodsattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * defaultvalues:
          * type: array
          * items:
            * $ref: '#/components/schemas/GoodsAttributesDefaultValue'

    * GoodsAttributesDefaultValue:
      * type: object
      * properties:
        * goodsAttributesId:
          * type: integer
        * goodsattributesid:
          * type: integer
        * defaultattributes:
          * type: string
        * defaultattributescreatetime:
          * type: string
          * format: date-time
        * defaultattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## List, Create GoodsAttributesDefaultValue API

paths:

  * /asset/goods-attribute-default-value/:
    * get:
      * summary: List all goods attribute default values
      * description: Retrieve a list of all goods attribute default values. Only accessible by admin users.
      * responses:
        * '200':
          * description: A list of goods attribute default values
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/GoodsAttributesDefaultValue'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsAttributesDefaultValue
      * security:
        * bearerAuth: []
    * post:
      * summary: Create a new goods attribute default value
      * description: Create a new goods attribute default value. Only accessible by admin users.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/GoodsAttributesDefaultValue'
      * responses:
        * '201':
          * description: The created goods attribute default value
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsAttributesDefaultValue'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsAttributesDefaultValue
      * security:
        * bearerAuth: []

components:

  * schemas:
    * GoodsAttributesDefaultValue:
      * type: object
      * properties:
        * goodsAttributesId:
          * type: integer
        * goodsattributesid:
          * type: integer
        * defaultattributes:
          * type: string
        * defaultattributescreatetime:
          * type: string
          * format: date-time
        * defaultattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## Retrieve, Destroy GoodsAttributes API

paths:

  * /asset/goods-attribute-default-value/{pk}/{name}/:
    * get:
      * summary: Retrieve a goods attribute default value
      * description: Retrieve the details of a specific goods attribute default value by its primary key and name. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the goods attribute.
          * schema:
            * type: integer
        * name: name
          * in: path
          * required: true
          * description: The name of the default attribute.
          * schema:
            * type: string
      * responses:
        * '200':
          * description: A goods attribute default value object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsAttributesDefaultValue'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsAttributesDefaultValue
      * security:
        * bearerAuth: []
    * delete:
      * summary: Delete a goods attribute default value
      * description: Delete a specific goods attribute default value by its primary key and name. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the goods attribute.
          * schema:
            * type: integer
        * name: name
          * in: path
          * required: true
          * description: The name of the default attribute.
          * schema:
            * type: string
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsAttributesDefaultValue
      * security:
        * bearerAuth: []

components:

  * schemas:
    * GoodsAttributesDefaultValue:
      * type: object
      * properties:
        * goodsAttributesId:
          * type: integer
        * goodsattributesid:
          * type: integer
        * defaultattributes:
          * type: string
        * defaultattributescreatetime:
          * type: string
          * format: date-time
        * defaultattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * UpdateGoodsAttributesDefaultValue:
      * type: object
      * properties:
        * defaultattributes:
          * type: string

* ___
## Destroy GoodsAttributes Default Values API

paths:

  * /asset/goods-attribute-default-value/{pk}/:
    * delete:
      * summary: Delete a goods attribute default value
      * description: Delete a specific goods attribute default value by its primary key and name. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the goods attribute.
          * schema:
            * type: integer
        * name: name
          * in: path
          * required: true
          * description: The name of the default attribute.
          * schema:
            * type: string
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsAttributesDefaultValue
      * security:
        * bearerAuth: []
* ___

## List, Create GoodsGroup API

paths:

  * /asset/goods-group/:
    * get:
      * summary: List all goods groups
      * description: Retrieve a list of all goods groups. Only accessible by admin users.
      * responses:
        * '200':
          * description: A list of goods groups
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/GoodsGroup'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsGroup
      * security:
        * bearerAuth: []
    * post:
      * summary: Create a new goods group
      * description: Create a new goods group. Only accessible by admin users.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/GoodsGroup'
      * responses:
        * '201':
          * description: The created goods group
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsGroup'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsGroup
      * security:
        * bearerAuth: []

components:

  * schemas:
    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## Detail, Update, Destroy GoodsGroup API

paths:

  * /asset/goods-group/{pk}/:
    * get:
      * summary: Retrieve a goods group
      * description: Retrieve the details of a specific goods group by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the goods group to retrieve.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: A goods group object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsGroup'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsGroup
      * security:
        * bearerAuth: []
    * patch:
      * summary: Update a goods group
      * description: Update the details of a specific goods group by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the goods group to update.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/GoodsGroup'
      * responses:
        * '200':
          * description: The updated goods group object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsGroup'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsGroup
      * security:
        * bearerAuth: []
    * delete:
      * summary: Delete a goods group
      * description: Delete a specific goods group by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the goods group to delete.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsGroup
      * security:
        * bearerAuth: []

components:

  * schemas:
    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## List, Create GoodsgroupAttributecategoryGoodsattributesOrder API

paths:

  * /asset/goods-group-attribut-category-goods-attribut-order/:
    * get:
      * summary: List all goods group attribute category goods attribute orders
      * description: Retrieve a list of all goods group attribute category goods attribute orders. Only accessible by admin users.
      * responses:
        * '200':
          * description: A list of goods group attribute category goods attribute orders
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/GoodsgroupAttributecategoryGoodsattributesOrder'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsgroupAttributecategoryGoodsattributesOrder
      * security:
        * bearerAuth: []
    * post:
      * summary: Create a new goods group attribute category goods attribute order
      * description: Create a new goods group attribute category goods attribute order. Only accessible by admin users.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/GoodsgroupAttributecategoryGoodsattributesOrder'
      * responses:
        * '201':
          * description: The created goods group attribute category goods attribute order
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsgroupAttributecategoryGoodsattributesOrder'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsgroupAttributecategoryGoodsattributesOrder
      * security:
        * bearerAuth: []

components:
  * schemas:
    * GoodsgroupAttributecategoryGoodsattributesOrder:
      * type: object
      * properties:
        * goodsattributesid:
          * type: object
          * $ref: '#/components/schemas/GoodsAttributes'
        * attributecategoryid:
          * type: object
          * $ref: '#/components/schemas/AttributeCategory'
        * gooodsgroupid:
          * type: object
          * $ref: '#/components/schemas/GoodsGroup'
        * GoodsAttributesId:
          * type: integer
        * AttributeCategoryId:
          * type: integer
        * GooodsGroupId:
          * type: integer
        * order:
          * type: integer

    * GoodsAttributes:
      * type: object
      * properties:
        * goodsattributesid:
          * type: integer
        * goodsattributestitle:
          * type: string
        * goodsattributestype:
          * type: integer
        * goodsattributescreatetime:
          * type: string
          * format: date-time
        * goodsattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * defaultvalues:
          * type: array
          * items:
            * $ref: '#/components/schemas/GoodsAttributesDefaultValue'

    * AttributeCategory:
      * type: object
      * properties:
        * attributecategoryid:
          * type: integer
        * attributecategoryname:
          * type: string
        * attributecategorycreatetime:
          * type: string
          * format: date-time
        * attributecategoryupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * GoodsAttributesDefaultValue:
      * type: object
      * properties:
        * goodsAttributesId:
          * type: integer
        * goodsattributesid:
          * type: integer
        * defaultattributes:
          * type: string
        * defaultattributescreatetime:
          * type: string
          * format: date-time
        * defaultattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## Retrieve, Update, Destroy GoodsgroupAttributecategoryGoodsattributesOrder API

paths:

  * /asset/goods-group-attribut-category-goods-attribut-order/{goodsattributesid}/{gooodsgroupid}/:
    * get:
      * summary: Retrieve a goods group attribute category goods attribute order
      * description: Retrieve the details of a specific goods group attribute category goods attribute order by its goods attributes ID and goods group ID. Only accessible by admin users.
      * parameters:
        * name: goodsattributesid
          * in: path
          * required: true
          * description: The ID of the goods attribute.
          * schema:
            * type: integer
        * name: gooodsgroupid
          * in: path
          * required: true
          * description: The ID of the goods group.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: A goods group attribute category goods attribute order object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsgroupAttributecategoryGoodsattributesOrder'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsgroupAttributecategoryGoodsattributesOrder
      * security:
        * bearerAuth: []
    * patch:
      * summary: Update a goods group attribute category goods attribute order
      * description: Update the details of a specific goods group attribute category goods attribute order by its goods attributes ID and goods group ID. Only accessible by admin users.
      * parameters:
        * name: goodsattributesid
          * in: path
          * required: true
          * description: The ID of the goods attribute.
          * schema:
            * type: integer
        * name: gooodsgroupid
          * in: path
          * required: true
          * description: The ID of the goods group.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/UpdateGoodsgroupAttributecategoryGoodsattributesOrder'
      * responses:
        * '200':
          * description: The updated goods group attribute category goods attribute order object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/GoodsgroupAttributecategoryGoodsattributesOrder'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsgroupAttributecategoryGoodsattributesOrder
      * security:
        * bearerAuth: []
    * delete:
      * summary: Delete a goods group attribute category goods attribute order
      * description: Delete a specific goods group attribute category goods attribute order by its goods attributes ID and goods group ID. Only accessible by admin users.
      * parameters:
        * name: goodsattributesid
          * in: path
          * required: true
          * description: The ID of the goods attribute.
          * schema:
            * type: integer
        * name: gooodsgroupid
          * in: path
          * required: true
          * description: The ID of the goods group.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * GoodsgroupAttributecategoryGoodsattributesOrder
      * security:
        * bearerAuth: []

components:

  * schemas:
    * GoodsgroupAttributecategoryGoodsattributesOrder:
      * type: object
      * properties:
        * goodsattributesid:
          * type: object
          * $ref: '#/components/schemas/GoodsAttributes'
        * attributecategoryid:
          * type: object
          * $ref: '#/components/schemas/AttributeCategory'
        * gooodsgroupid:
          * type: object
          * $ref: '#/components/schemas/GoodsGroup'
        * GoodsAttributesId:
          * type: integer
        * AttributeCategoryId:
          * type: integer
        * GooodsGroupId:
          * type: integer
        * order:
          * type: integer

    * UpdateGoodsgroupAttributecategoryGoodsattributesOrder:
      * type: object
      * properties:
        * AttributeCategoryId:
          * type: integer
        * order:
          * type: integer

    * GoodsAttributes:
      * type: object
      * properties:
        * goodsattributesid:
          * type: integer
        * goodsattributestitle:
          * type: string
        * goodsattributestype:
          * type: integer
        * goodsattributescreatetime:
          * type: string
          * format: date-time
        * goodsattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * defaultvalues:
          * type: array
          * items:
            * $ref: '#/components/schemas/GoodsAttributesDefaultValue'

    * AttributeCategory:
      * type: object
      * properties:
        * attributecategoryid:
          * type: integer
        * attributecategoryname:
          * type: string
        * attributecategorycreatetime:
          * type: string
          * format: date-time
        * attributecategoryupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * GoodsAttributesDefaultValue:
      * type: object
      * properties:
        * goodsAttributesId:
          * type: integer
        * goodsattributesid:
          * type: integer
        * defaultattributes:
          * type: string
        * defaultattributescreatetime:
          * type: string
          * format: date-time
        * defaultattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## List, Create Goods API

paths:

  * /asset/goods/:
    * get:
      * summary: List all goods
      * description: Retrieve a list of all goods. Only accessible by admin users.
      * responses:
        * '200':
          * description: A list of goods
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/Goods'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * Goods
      * security:
        * bearerAuth: []
    * post:
      * summary: Create a new good
      * description: Create a new good. Only accessible by admin users.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Goods'
      * responses:
        * '201':
          * description: The created good
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Goods'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * Goods
      * security:
        * bearerAuth: []

components:

  * schemas:
    * Goods:
      * type: object
      * properties:
        * goodsid:
          * type: integer
        * goodsname:
          * type: string
        * gooodsgroupid:
          * type: object
          * $ref: '#/components/schemas/GoodsGroup'
        * GooodsGroupId:
          * type: integer
        * goodscreatetime:
          * type: string
          * format: date-time
        * goodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## Retrieve, Update, Destroy Goods API

paths:

 * /asset/goods/{pk}/:
    * get:
      * summary: Retrieve a good
      * description: Retrieve the details of a specific good by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the good to retrieve.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: A good object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Goods'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * Goods
      * security:
        * bearerAuth: []
    * patch:
      * summary: Update a good
      * description: Update the details of a specific good by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the good to update.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Goods'
      * responses:
        * '200':
          * description: The updated good object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Goods'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * Goods
      * security:
        * bearerAuth: []
    * delete:
      * summary: Delete a good
      * description: Delete a specific good by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the good to delete.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * Goods
      * security:
        * bearerAuth: []

components:

 * schemas:
    * Goods:
      * type: object
      * properties:
        * goodsid:
          * type: integer
        * goodsname:
          * type: string
        * gooodsgroupid:
          * type: object
          * $ref: '#/components/schemas/GoodsGroup'
        * GooodsGroupId:
          * type: integer
        * goodscreatetime:
          * type: string
          * format: date-time
        * goodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## List, Create AssinedAttributestoGoods API

paths:

  * /asset/assign-attribute-goods/:
    * get:
      * summary: List all assigned attributes to goods
      * description: Retrieve a list of all assigned attributes to goods. Only accessible by admin users.
      * responses:
        * '200':
          * description: A list of assigned attributes to goods
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/AssinedAttributestoGoods'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * AssinedAttributestoGoods
      * security:
        * bearerAuth: []
    * post:
      * summary: Assign a new attribute to a good
      * description: Assign a new attribute to a good. Only accessible by admin users.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/AssinedAttributestoGoods'
      * responses:
        * '201':
          * description: The assigned attribute to a good
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/AssinedAttributestoGoods'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * AssinedAttributestoGoods
      * security:
        * bearerAuth: []

components:

  * schemas:
    * AssinedAttributestoGoods:
      * type: object
      * properties:
        * GoodsId:
          * type: integer
        * GoodsAttributesId:
          * type: integer
        * goodsid:
          * type: object
          * $ref: '#/components/schemas/Goods'
        * goodsattributesid:
          * type: object
          * $ref: '#/components/schemas/GoodsAttributes'
        * attributevalue:
          * type: string

    * Goods:
      * type: object
      * properties:
        * goodsid:
          * type: integer
        * goodsname:
          * type: string
        * gooodsgroupid:
          * type: object
          * $ref: '#/components/schemas/GoodsGroup'
        * GooodsGroupId:
          * type: integer
        * goodscreatetime:
          * type: string
          * format: date-time
        * goodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * GoodsAttributes:
      * type: object
      * properties:
        * goodsattributesid:
          * type: integer
        * goodsattributestitle:
          * type: string
        * goodsattributestype:
          * type: integer
        * goodsattributescreatetime:
          * type: string
          * format: date-time
        * goodsattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * defaultvalues:
          * t* ype: array
          * items:
            * $ref: '#/components/schemas/GoodsAttributesDefaultValue'

    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
    * GoodsAttributesDefaultValue:
      * type: object
      * properties:
        * goodsAttributesId:
          * type: integer
        * goodsattributesid:
          * type: integer
        * defaultattributes:
          * type: string
        * defaultattributescreatetime:
          * type: string
          * format: date-time
        * defaultattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## Retrieve, Update, Destroy  AssinedAttributestoGoods API

paths:

   * /asset/assign-attribute-goods/{goodsattributesid}/{goodsid}/:
     * get:
       * summary: Retrieve an assigned attribute to a good
       * description: Retrieve the details of a specific assigned attribute to a good by its goods attributes ID and goods ID. Only accessible by admin users.
       * parameters:
         * name: goodsattributesid
           * in: path
           * required: true
           * description: The ID of the goods attribute.
           * schema:
             * type: integer
         * name: goodsid
           * in: path
           * required: true
           * description: The ID of the good.
           * schema:
             * type: integer
       * responses:
         * '200':
           * description: An assigned attribute to a good object
           * content:
             * application/json:
               * schema:
                 * $ref: '#/components/schemas/AssinedAttributestoGoods'
         * '401':
           * description: Unauthorized
         * '403':
           * description: Forbidden
         * '404':
           * description: Not Found
         * '500':
           * description: Internal Server Error
       * tags:
         * AssinedAttributestoGoods
       * security:
         * bearerAuth: []
     * patch:
       * summary: Update an assigned attribute to a good
       * description: Update the details of a specific assigned attribute to a good by its goods attributes ID and goods ID. Only accessible by admin users.
       * parameters:
         * name: goodsattributesid
           * in: path
           * required: true
           * description: The ID of the goods attribute.
           * schema:
             * type: integer
         * name: goodsid
           * in: path
           * required: true
           * description: The ID of the good.
           * schema:
             * type: integer
       * requestBody:
         * required: true
         * content:
           * application/json:
             * schema:
               * $ref: '#/components/schemas/UpdateAssinedAttributestoGoods'
       * responses:
         * '200':
           * description: The updated assigned attribute to a good object
           * content:
             * application/json:
               * schema:
                 * $ref: '#/components/schemas/AssinedAttributestoGoods'
         * '400':
           * description: Bad Request
         * '401':
           * description: Unauthorized
         * '403':
           * description: Forbidden
         * '404':
           * description: Not Found
         * '500':
           * description: Internal Server Error
       * tags:
         * AssinedAttributestoGoods
       * security:
         * bearerAuth: []
     * delete:
       * summary: Delete an assigned attribute to a good
       * description: Delete a specific assigned attribute to a good by its goods attributes ID and goods ID. Only accessible by admin users.
       * parameters:
         * name: goodsattributesid
           * in: path
           * required: true
           * description: The ID of the goods attribute.
           * schema:
             * type: integer
         * name: goodsid
           * in: path
           * required: true
           * description: The ID of the good.
           * schema:
             * type: integer
       * responses:
         * '204':
           * description: No Content
         * '401':
           * description: Unauthorized
         * '403':
           * description: Forbidden
         * '404':
           * description: Not Found
         * '500':
           * description: Internal Server Error
       * tags:
         * AssinedAttributestoGoods
       * security:
         * bearerAuth: []

components:

   * schemas:
     * AssinedAttributestoGoods:
       * type: object
       * properties:
         * GoodsId:
           * type: integer
         * GoodsAttributesId:
           * type: integer
         * goodsid:
           * type: object
           * $ref: '#/components/schemas/Goods'
         * goodsattributesid:
           * type: object
           * $ref: '#/components/schemas/GoodsAttributes'
         * attributevalue:
           * type: string

     * UpdateAssinedAttributestoGoods:
       * type: object
       * properties:
         * attributevalue:
           * type: string

     * Goods:
       * type: object
       * properties:
         * goodsid:
           * type: integer
         * goodsname:
           * type: string
         * gooodsgroupid:
           * type: object
           * $ref: '#/components/schemas/GoodsGroup'
         * GooodsGroupId:
           * type: integer
         * goodscreatetime:
           * type: string
           * format: date-time
         * goodsupdatetime:
           * type: string
           * format: date-time
         * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
         * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
     * GoodsAttributes:
       * type: object
       * properties:
         * goodsattributesid:
           * type: integer
         * goodsattributestitle:
           * type: string
         * goodsattributestype:
           * type: integer
         * goodsattributescreatetime:
           * type: string
           * format: date-time
         * goodsattributesupdatetime:
           * type: string
           * format: date-time
         * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
         * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
         * defaultvalues:
           * type: array
           * items:
             * $ref: '#/components/schemas/GoodsAttributesDefaultValue'

     * GoodsGroup:
       * type: object
       * properties:
         * gooodsgroupid:
           * type: integer
         * gooodsgroupname:
           * type: string
         * ispartinsidecomputer:
           * type: boolean
         * isallowedtosendout:
           * type: boolean
         * isallowedtobeaborted:
           * type: boolean
         * isallowedtomove:
           * type: boolean
         * ispossibletorepair:
           * type: boolean
         * gooodsgroupcreatetime:
           * type: string
           * format: date-time
         * gooodsgroupupdatetime:
           * type: string
           * format: date-time
         * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
         * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

     * GoodsAttributesDefaultValue:
       * type: object
       * properties:
         * goodsAttributesId:
           * type: integer
         * goodsattributesid:
           * type: integer
         * defaultattributes:
           * type: string
        * defaultattributescreatetime:
          * type: string
          * format: date-time
        * defaultattributesupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## List, Create DeliveredGoods API

paths:

  * /asset/delivered-goods/:
    * get:
      * summary: List all delivered goods
      * description: Retrieve a list of all delivered goods. Only accessible by admin users.
      * responses:
        * '200':
          * description: A list of delivered goods
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/DeliveredGoods'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * DeliveredGoods
      * security:
        * bearerAuth: []
    * post:
      * summary: Create a new delivered good
      * description: Create a new delivered good. Only accessible by admin users.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/DeliveredGoods'
      * responses:
        * '201':
          * description: The created delivered good
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/DeliveredGoods'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * DeliveredGoods
      * security:
        * bearerAuth: []

components:

  * schemas:
    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
        * deliveredgoodsserial:
          * type: string
        * deliveredgoodscreatetime:
          * type: string
          * format: date-time
        * deliveredgoodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
            * updatercreatetime:
              * type: string
              * format: date-time
            * updaterupdatetime:
              * type: string
              * format: date-time
            * updaterdonetime:
              * type: string
              * format: date-time
        * goodsid:
          * type: object
          * $ref: '#/components/schemas/Goods'
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
        * isAbortion:
          * type: boolean
        * GoodsId:
          * type: integer

    * Goods:
      * type: object
      * properties:
        * goodsid:
          * type: integer
        * goodsname:
          * type: string
        * gooodsgroupid:
          * type: object
          * $ref: '#/components/schemas/GoodsGroup'
        * GooodsGroupId:
          * type: integer
        * goodscreatetime:
          * type: string
          * format: date-time
        * goodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## Retrieve, Update, Destroy DeliveredGoods

paths:

  * /asset/delivered-goods/{pk}/:
    * get:
     *  summary: Retrieve a delivered good
      * description: Retrieve the details of a specific delivered good by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the delivered good to retrieve.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: A delivered good object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/DeliveredGoods'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * DeliveredGoods
      * security:
        * bearerAuth: []
    * patch:
      * summary: Update a delivered good
      * description: Update the details of a specific delivered good by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the delivered good to update.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/DeliveredGoods'
      * responses:
        * '200':
          * description: The updated delivered good object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/DeliveredGoods'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * DeliveredGoods
      * security:
        * bearerAuth: []
    * delete:
      * summary: Delete a delivered good
      * description: Delete a specific delivered good by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the delivered good to delete.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * DeliveredGoods
      * security:
        * bearerAuth: []

components:

  * schemas:
    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
        * deliveredgoodsserial:
          * type: string
        * deliveredgoodscreatetime:
          * type: string
          * format: date-time
        * deliveredgoodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
            * updatercreatetime:
              * type: string
              * format: date-time
            * updaterupdatetime:
              * type: string
              * format: date-time
            * updaterdonetime:
              * type: string
              * format: date-time
        * goodsid:
          * type: object
          * $ref: '#/components/schemas/Goods'
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
        * isAbortion:
          * type: boolean
        * GoodsId:
          * type: integer

    * Goods:
      * type: object
      * properties:
        * goodsid:
          * type: integer
        * goodsname:
          * type: string
        * gooodsgroupid:
          * type: object
          * $ref: '#/components/schemas/GoodsGroup'
        * GooodsGroupId:
          * type: integer
        * goodscreatetime:
          * type: string
          * format: date-time
        * goodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## Update, Destroy DeliveredGoodsRelatedToComputer

paths:
  * /asset/delivered-goods-related-to-computer/{pk}/:
    * patch:
      * summary: Update a delivered good related to a computer
      * description: Update the details of a specific delivered good related to a computer by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the delivered good to update.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/DeliveredGoodsRelatedToComputer'
      * responses:
        * '200':
          * description: The updated delivered good related to a computer object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/DeliveredGoods'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * DeliveredGoods
      * security:
        * bearerAuth: []
    * delete:
      * summary: Delete a delivered good related to a computer
      * description: Delete the relation of a specific delivered good to a computer by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the delivered good to delete the relation.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * DeliveredGoods
      * security:
        * bearerAuth: []

components:
  * schemas:
    * DeliveredGoodsRelatedToComputer:
      * type: object
      * properties:
        * computerpropertynumber:
          * type: integer

    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
        * deliveredgoodsserial:
          * type: string
        * deliveredgoodscreatetime:
          * type: string
          * format: date-time
        * deliveredgoodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
            * updatercreatetime:
              * type: string
              * format: date-time
            * updaterupdatetime:
              * type: string
              * format: date-time
            * updaterdonetime:
              * type: string
              * format: date-time
        * goodsid:
          * type: object
          * $ref: '#/components/schemas/Goods'
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
        * isAbortion:
          * type: boolean
        * GoodsId:
          * type: integer

    * Goods:
      * type: object
      * properties:
        * goodsid:
          * type: integer
        * goodsname:
          * type: string
        * gooodsgroupid:
          * type: object
          * $ref: '#/components/schemas/GoodsGroup'
        * GooodsGroupId:
          * type: integer
        * goodscreatetime:
          * type: string
          * format: date-time
        * goodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time

    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
* ___
## List, Create ComputerSealling API

paths:
  * /asset/computer-sealling/:
    * get:
      * summary: List all computer sealings
      * description: Retrieve a list of all computer sealings. Only accessible by admin users.
      * responses:
        * '200':
          * description: A list of computer sealings
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/ComputerSealling'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * ComputerSealling
      * security:
        * bearerAuth: []
    * post:
      * summary: Create a new computer sealing
      * description: Create a new computer sealing. Only accessible by admin users.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ComputerSealling'
      * responses:
        * '201':
          * description: The created computer sealing
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ComputerSealling'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * ComputerSealling
      * security:
        * bearerAuth: []

components:
  * schemas:
    * ComputerSealling:
      * type: object
      * properties:
        * computerseallingid:
          * type: integer
        * computerseallingnumber:
          * type: string
        * computerseallingcreatetime:
          * type: string
          * format: date-time
        * computerseallingupdatetime:
          * type: string
          * format: date-time
        * isexpired:
          * type: boolean
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
            * updatercreatetime:
              * type: string
              * format: date-time
            * updaterupdatetime:
              * type: string
              * format: date-time
            * updaterdonetime:
              * type: string
              * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * internalrepairid:
          * type: object
          * properties:
            * internalrepairid:
              * type: integer
            * internalrepairdescription:
              * type: string
            * internalrepairchangingdescription:
              * type: string
            * internalrepaircreatetime:
              * type: string
              * format: date-time
            * internalrepairupdatetime:
              * type: string
              * format: date-time
            * internalrepairdonetime:
              * type: string
              * format: date-time
* ___
## Retrieve, Update, Destroy ComputerSealling API
paths:

  * /asset/computer-sealling/{pk}/:
    * get:
      * summary: Retrieve a computer sealing
      * description: Retrieve the details of a specific computer sealing by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the computer sealing to retrieve.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: A computer sealing object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ComputerSealling'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * ComputerSealling
      * security:
        * bearerAuth: []
    * patch:
      * summary: Update a computer sealing
      * description: Update the details of a specific computer sealing by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the computer sealing to update.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ComputerSealling'
      * responses:
        * '200':
          * description: The updated computer sealing object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ComputerSealling'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * ComputerSealling
      * security:
        * bearerAuth: []
    * delete:
      * summary: Delete a computer sealing
      * description: Delete a specific computer sealing by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the computer sealing to delete.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * ComputerSealling
      * security:
        * bearerAuth: []

components:

  * schemas:
    * ComputerSealling:
      * type: object
      * properties:
        * computerseallingid:
          * type: integer
        * computerseallingnumber:
          * type: string
        * computerseallingcreatetime:
          * type: string
          * format: date-time
        * computerseallingupdatetime:
          * type: string
          * format: date-time
        * isexpired:
          * type: boolean
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
            * updatercreatetime:
              * type: string
              * format: date-time
            * updaterupdatetime:
              * type: string
              * format: date-time
            * updaterdonetime:
              * type: string
              * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * internalrepairid:
          * type: object
          * properties:
            * internalrepairid:
              * type: integer
            * internalrepairdescription:
              * type: string
            * internalrepairchangingdescription:
              * type: string
            * internalrepaircreatetime:
              * type: string
              * format: date-time
            * internalrepairupdatetime:
              * type: string
              * format: date-time
            * internalrepairdonetime:
              * type: string
              * format: date-time
* ___
## Update, Destroy AssignSeallToComputer API

paths:
  * /asset/assign-seall-to-computer/{pk}/:
    * patch:
      * summary: Assign a seal to a computer
      * description: Assign a seal to a computer by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the seal to assign.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/AssignSeallToComputer'
      * responses:
        * '200':
          * description: The assigned seal to a computer object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ComputerSealling'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * ComputerSealling
      * security:
        * bearerAuth: []
    * delete:
      * summary: Unassign a seal from a computer
      * description: Unassign a seal from a computer by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the seal to unassign.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * ComputerSealling
      * security:
        * bearerAuth: []

components:
  * schemas:
    * AssignSeallToComputer:
      * type: object
      * properties:
        * computerpropertynumber:
          * type: integer

    * ComputerSealling:
      * type: object
      * properties:
        * computerseallingid:
          * type: integer
        * computerseallingnumber:
          * type: string
        * computerseallingcreatetime:
          * type: string
          * format: date-time
        * computerseallingupdatetime:
          * type: string
          * format: date-time
        * isexpired:
          * type: boolean
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
            * updatercreatetime:
              * type: string
              * format: date-time
            * updaterupdatetime:
              * type: string
              * format: date-time
            * updaterdonetime:
              * type: string
              * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * internalrepairid:
          * type: object
          * properties:
            * internalrepairid:
              * type: integer
            * internalrepairdescription:
              * type: string
            * internalrepairchangingdescription:
              * type: string
            * internalrepaircreatetime:
              * type: string
              * format: date-time
            * internalrepairupdatetime:
              * type: string
              * format: date-time
            * internalrepairdonetime:
              * type: string
              * format: date-time
* ___
## Update, Destroy AssignSeallToUser API

paths:
  * /asset/assign-computer-to-user/{pk}/:
    * patch:
      * summary: Assign a computer to a user
      * description: Assign a computer to a user by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the computer to assign.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/AssignComputerToUser'
      * responses:
        * '200':
          * description: The assigned computer object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Computer'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * Computer
      * security:
        * bearerAuth: []
    * delete:
      * summary: Unassign a computer from a user
      * description: Unassign a computer from a user by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the computer to unassign.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * Computer
      * security:
        * bearerAuth: []

components:
  * schemas:
    * AssignComputerToUser:
      * type: object
      * properties:
        * ownerUserId:
          * type: integer
        * areaId:
          * type: integer
        * buildingId:
          * type: integer

    * Computer:
      * type: object
      * properties:
        * computerpropertynumber:
          * type: integer
        * computername:
          * type: string
        * computercreatetime:
          * type: string
          * format: date-time
        * computerupdatetime:
          * type: string
          * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
* ___
## Assign Delivered Goods To User API

paths:
  * /asset/assign-delivered-goods-to-user/{pk}/:
    * patch:
      * summary: Assign delivered goods to a user
      * description: Assign delivered goods to a user by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the delivered goods to assign.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/AssignDeliveredGoodsToUser'
      * responses:
        * '200':
          * description: The assigned delivered goods object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/DeliveredGoods'
        * '400':
          * description: Bad Request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * DeliveredGoods
      * security:
        * bearerAuth: []
    * delete:
      * summary: Unassign delivered goods from a user
      * description: Unassign delivered goods from a user by its primary key. Only accessible by admin users.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The primary key of the delivered goods to unassign.
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: No Content
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * DeliveredGoods
      * security:
        * bearerAuth: []

components:
  * schemas:
    * AssignDeliveredGoodsToUser:
      * type: object
      * properties:
        * ownerUserId:
          * type: integer
        * areaId:
          * type: integer
        * buildingId:
          * type: integer

    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
        * deliveredgoodsserial:
          * type: string
        * deliveredgoodscreatetime:
          * type: string
          * format: date-time
        * deliveredgoodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
            * updatercreatetime:
              * type: string
              * format: date-time
            * updaterupdatetime:
              * type: string
              * format: date-time
            * updaterdonetime:
              * type: string
              * format: date-time
        * goodsid:
          * type: object
          * $ref: '#/components/schemas/Goods'
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
        * isAbortion:
          * type: boolean
        * GoodsId:
          * type: integer

    * Goods:
      * type: object
      * properties:
        * goodsid:
          * type: integer
        * goodsname:
          * type: string
        * gooodsgroupid:
          * type: object
          * $ref: '#/components/schemas/GoodsGroup'
        * GooodsGroupId:
          * type: integer
        * goodscreatetime:
          * type: string
          * format: date-time
        * goodsupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time

    * GoodsGroup:
      * type: object
      * properties:
        * gooodsgroupid:
          * type: integer
        * gooodsgroupname:
          * type: string
        * ispartinsidecomputer:
          * type: boolean
        * isallowedtosendout:
          * type: boolean
        * isallowedtobeaborted:
          * type: boolean
        * isallowedtomove:
          * type: boolean
        * ispossibletorepair:
          * type: boolean
        * gooodsgroupcreatetime:
          * type: string
          * format: date-time
        * gooodsgroupupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
* ___
## paths:
  * /asset/owned-computers/:
    * get:
      * summary: List all computers owned by the authenticated user
      * description: Retrieve a list of all computers owned by the authenticated user. Only accessible by authenticated users.
      * responses:
        * '200':
          * description: A list of computers owned by the authenticated user
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/Computer'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal Server Error
      * tags:
        * Computer
      * security:
        * bearerAuth: []

components:
  * schemas:
    * Computer:
      * type: object
      * properties:
        * computerpropertynumber:
          * type: integer
        * computername:
          * type: string
        * computercreatetime:
          * type: string
          * format: date-time
        * computerupdatetime:
          * type: string
          * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
* ___
## User Own Computer Detail Api

paths:
  * /asset/owned-computers/{computer_id}/:
    * get:
      * summary: Retrieve details of a computer owned by the authenticated user
      * description: Retrieve the details of a specific computer owned by the authenticated user by its computer ID. Only accessible by authenticated users.
      * parameters:
        * name: computer_id
          * in: path
          * required: true
          * description: The ID of the computer to retrieve.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: A computer object
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Computer'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '404':
          * description: Not Found
        * '500':
          * description: Internal Server Error
      * tags:
        * Computer
      * security:
        * bearerAuth: []

components:
  * schemas:
    * Computer:
      * type: object
      * properties:
        * computerpropertynumber:
          * type: integer
        * computername:
          * type: string
        * computercreatetime:
          * type: string
          * format: date-time
        * computerupdatetime:
          * type: string
          * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
* ___
## Users Owned Delivered Goods Api

paths:
  * /asset/owned-delivered-goods/:
    * get:
      * summary: Retrieve user's owned delivered goods
      * description: Returns a list of delivered goods owned by the authenticated user that are not related to any computer property number.
      * tags:
        * Delivered Goods
      * security:
        * bearerAuth: []
      * responses:
        * '200':
          * description: A list of delivered goods
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/DeliveredGoods'
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error
components:
  * schemas:
    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
          * description: The unique identifier of the delivered good
        * deliveredgoodsserial:
          * type: string
          * description: The serial number of the delivered good
        * deliveredgoodscreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the delivered good
        * deliveredgoodsupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the delivered good
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
              * description: The ID of the updater
            * updatercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the updater
            * updaterupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the updater
            * updaterdonetime:
              * type: string
              * format: date-time
              * description: The done time of the updater
        * goodsid:
          * type: object
          * description: The goods associated with the delivered good
          * properties:
            * goodsid:
              * type: integer
              * description: The ID of the goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * gooodsgroupid:
              * type: object
              * properties:
                * gooodsgroupid:
                  * type: integer
                  * description: The ID of the goods group
                * gooodsgroupname:
                  * type: string
                  * description: The name of the goods group
                * gooodsgroupcreatetime:
                  * type: string
                  * format: date-time
                  * description: The creation time of the goods group
                * gooodsgroupupdatetime:
                  * type: string
                  * format: date-time
                  * description: The last update time of the goods group
            * goodscreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the goods
            * goodsupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the goods
            * createruserid:
              * type: object
              * readOnly: true
              * properties:
                * userpersonalid:
                  * type: integer
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
            * updateruserid:
              * type: object
              * readOnly: true
              * properties:
                * userpersonalid:
                  * type: integer
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
        * areaid:
          * type: object
          * description: The area associated with the delivered good
          * properties:
            * areaid:
              * type: integer
              * description: The ID of the area
            * areaname:
              * type: string
              * description: The name of the area
            * areacreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the area
            * areaupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the area
        * buildingid:
          * type: object
          * description: The building associated with the delivered good
          * properties:
            * buildingid:
              * type: integer
              * description: The ID of the building
            * buildingname:
              * type: string
              * description: The name of the building
            * buildingabbrivationname:
              * type: string
              * description: The abbreviation name of the building
            * buildingcreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the building
            * buildingupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the building
            * buildingfloorcount:
              * type: integer
              * description: The number of floors in the building
            * buildingroomcount:
              * type: integer
              * description: The number of rooms in the building
        * isAbortion:
          * type: boolean
          * description: Indicates if the delivered good is aborted
        * GoodsId:
          * type: integer
          * description: The ID of the goods (write-only)
* ___
## Users Owned Delivered Goods Detail Api

paths:

  * /asset/owned-delivered-goods/{deliveredgoods_id}/:
    * get:
      * summary: Retrieve a specific delivered good owned by the user
      * description: Returns the details of a specific delivered good owned by the authenticated user that is not related to any computer property number.
      * tags:
        * Delivered Goods
      * security:
        * bearerAuth: []
      * parameters:
        * name: deliveredgoods_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the delivered good
      * responses:
        * '200':
          * description: Details of the delivered good
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/DeliveredGoods'
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Delivered good not found or not accessible
        * '500':
          * description: Internal server error

components:
  * schemas:
    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
          * description: The unique identifier of the delivered good
        * deliveredgoodsserial:
          * type: string
          * description: The serial number of the delivered good
        * deliveredgoodscreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the delivered good
        * deliveredgoodsupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the delivered good
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
              * description: The ID of the updater
            * updatercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the updater
            * updaterupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the updater
            * updaterdonetime:
              * type: string
              * format: date-time
              * description: The done time of the updater
        * goodsid:
          * type: object
          * description: The goods associated with the delivered good
          * properties:
            * goodsid:
              * type: integer
              * description: The ID of the goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * gooodsgroupid:
              * type: object
              * properties:
                * gooodsgroupid:
                  * type: integer
                  * description: The ID of the goods group
                * gooodsgroupname:
                  * type: string
                  * description: The name of the goods group
                * gooodsgroupcreatetime:
                  * type: string
                  * format: date-time
                  * description: The creation time of the goods group
                * gooodsgroupupdatetime:
                  * type: string
                  * format: date-time
                  * description: The last update time of the goods group
            * goodscreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the goods
            * goodsupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the goods
            * createruserid:
              * type: object
              * readOnly: true
              * properties:
                * userpersonalid:
                  * type: integer
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
            * updateruserid:
              * type: object
              * readOnly: true
              * properties:
                * userpersonalid:
                  * type: integer
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
        * areaid:
          * type: object
          * description: The area associated with the delivered good
          * properties:
            * areaid:
              * type: integer
              * description: The ID of the area
            * areaname:
              * type: string
              * description: The name of the area
            * areacreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the area
            * areaupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the area
        * buildingid:
          * type: object
          * description: The building associated with the delivered good
          * properties:
            * buildingid:
              * type: integer
              * description: The ID of the building
            * buildingname:
              * type: string
              * description: The name of the building
            * buildingabbrivationname:
              * type: string
              * description: The abbreviation name of the building
            * buildingcreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the building
            * buildingupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the building
            * buildingfloorcount:
              * type: integer
              * description: The number of floors in the building
            * buildingroomcount:
              * type: integer
              * description: The number of rooms in the building
        * isAbortion:
          * type: boolean
          * description: Indicates if the delivered good is aborted
        * GoodsId:
          * type: integer
          * description: The ID of the goods (write-only)
* ___
# Users Owned Property Api

paths:

  * /asset/owned-property/:
    * get:
      * summary: Retrieve user's owned property
      * description: Returns a list of computers and delivered goods owned by the authenticated user.
      * tags:
        * Owned Property
      * security:
        * bearerAuth: []
      * responses:
        * '200':
          * description: A list of computers and delivered goods
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * computers:
                    * type: array
                    * items:
                      * $ref: '#/components/schemas/Computer'
                  * deliveredGoods:
                    * type: array
                    * items:
                      * $ref: '#/components/schemas/DeliveredGoods'
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error
components:

  * schemas:
    * Computer:
      * type: object
      * properties:
        * computerpropertynumber:
          * type: string
        * computername:
          * type: string
        * computermodel:
          * type: string
        * computerip:
          * type: string
        * computermacaddress:
          * type: string
        * computerispersonal:
          * type: boolean
        * osVersionId:
          * type: integer
          * writeOnly: true
        * computercreatetime:
          * type: string
          * format: date-time
        * computerupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * operationsystemversionid:
          * type: object
          * properties:
            * operationsystemversionid:
              * type: integer
            * operationsystemversionname:
              * type: string
            * operationsystemname:
              * type: string
            * operationsystemversioncreatetime:
              * type: string
              * format: date-time
            * operationsystemversionupdatetime:
              * type: string
              * format: date-time
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
        * sealing:
          * type: object
          * properties:
            * computerseallingnumber:
              * type: string
            * isexpired:
              * type: boolean
        * relateddeliveredgoods:
          * type: array
          * items:
            * type: object
            * properties:
              * deliveredgoodsid:
                * type: integer
              * deliveredgoodsserial:
                * type: string
              * deliveredgoodscreatetime:
                * type: string
                * format: date-time
              * deliveredgoodsupdatetime:
                * type: string
                * format: date-time
        * isAbortion:
          * type: boolean
    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
          * description: The unique identifier of the delivered good
        * deliveredgoodsserial:
          * type: string
          * description: The serial number of the delivered good
        * deliveredgoodscreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the delivered good
        * deliveredgoodsupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the delivered good
        * createruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
              * description: The ID of the updater
            * updatercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the updater
            * updaterupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the updater
            * updaterdonetime:
              * type: string
              * format: date-time
              * description: The done time of the updater
        * goodsid:
          * type: object
          * description: The goods associated with the delivered good
          * properties:
            * goodsid:
              * type: integer
              * description: The ID of the goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * gooodsgroupid:
              * type: object
              * properties:
                * gooodsgroupid:
                  * type: integer
                  * description: The ID of the goods group
                * gooodsgroupname:
                  * type: string
                  * description: The name of the goods group
                * gooodsgroupcreatetime:
                  * type: string
                  * format: date-time
                  * description: The creation time of the goods group
                * gooodsgroupupdatetime:
                  * type: string
                  * format: date-time
                  * description: The last update time of the goods group
            * goodscreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the goods
            * goodsupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the goods
            * createruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
            * updateruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * areaid:
          * type: object
          * description: The area associated with the delivered good
          * properties:
            * areaid:
              * type: integer
              * description: The ID of the area
            * areaname:
              * type: string
              * description: The name of the area
            * areacreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the area
            * areaupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the area
        * buildingid:
          * type: object
          * description: The building associated with the delivered good
          * properties:
            * buildingid:
              * type: integer
              * description: The ID of the building
            * buildingname:
              * type: string
              * description: The name of the building
            * buildingabbrivationname:
              * type: string
              * description: The abbreviation name of the building
            * buildingcreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the building
            * buildingupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the building
            * buildingfloorcount:
              * type: integer
              * description: The number of floors in the building
            * buildingroomcount:
              * type: integer
              * description: The number of rooms in the building
        * isAbortion:
          * type: boolean
          * description: Indicates if the delivered good is aborted
        * GoodsId:
          * type: integer
          * description: The ID of the goods (write-only)
* ___
## SubUser Users Owned Property Api

paths:
  * /asset/subuser-owned-properties/:
    * get:
      * summary: Retrieve properties owned by subusers
      * description:         Returns a list of computers and delivered goods owned by users other than the authenticated user. 
        * If the authenticated user has a role of "Supporter" (user role ID 2), the results are filtered by the user's working locations. 
        * Otherwise, all properties owned by other users are returned. access by admin, supporter.
      * tags:
        * Subuser Owned Property
      * security:
        * bearerAuth: []
      * responses:
        * '200':
          * description: A list of computers and delivered goods owned by subusers
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * computers:
                    * type: array
                    * items:
                      * $ref: '#/components/schemas/Computer'
                  * deliveredGoods:
                    * type: array
                    * items:
                      * $ref: '#/components/schemas/DeliveredGoods'
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error
components:
  * schemas:
    * Computer:
      * type: object
      * properties:
        * computerpropertynumber:
          * type: string
        * computername:
          * type: string
        * computermodel:
          * type: string
        * computerip:
          * type: string
        * computermacaddress:
          * type: string
        * computerispersonal:
          * type: boolean
        * osVersionId:
          * type: integer
          * writeOnly: true
        * computercreatetime:
          * type: string
          * format: date-time
        * computerupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * operationsystemversionid:
          * type: object
          * properties:
            * operationsystemversionid:
              * type: integer
            * operationsystemversionname:
              * type: string
            * operationsystemname:
              * type: string
            * operationsystemversioncreatetime:
              * type: string
              * format: date-time
            * operationsystemversionupdatetime:
              * type: string
              * format: date-time
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
        * sealing:
          * type: object
          * properties:
            * computerseallingnumber:
              * type: string
            * isexpired:
              * type: boolean
        * relateddeliveredgoods:
          * type: array
          * items:
            * type: object
            * properties:
              * deliveredgoodsid:
                * type: integer
              * deliveredgoodsserial:
                * type: string
              * deliveredgoodscreatetime:
                * type: string
                * format: date-time
              * deliveredgoodsupdatetime:
                * type: string
                * format: date-time
        * isAbortion:
          * type: boolean
    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
          * description: The unique identifier of the delivered good
        * deliveredgoodsserial:
          * type: string
          * description: The serial number of the delivered good
        * deliveredgoodscreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the delivered good
        * deliveredgoodsupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the delivered good
        * createruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
              * description: The ID of the updater
            * updatercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the updater
            * updaterupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the updater
            * updaterdonetime:
              * type: string
              * format: date-time
              * description: The done time of the updater
        * goodsid:
          * type: object
          * description: The goods associated with the delivered good
          * properties:
            * goodsid:
              * type: integer
              * description: The ID of the goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * gooodsgroupid:
              * type: object
              * properties:
                * gooodsgroupid:
                  * type: integer
                  * description: The ID of the goods group
                * gooodsgroupname:
                  * type: string
                  * description: The name of the goods group
                * gooodsgroupcreatetime:
                  * type: string
                  * format: date-time
                  * description: The creation time of the goods group
                * gooodsgroupupdatetime:
                  * type: string
                  * format: date-time
                  * description: The last update time of the goods group
            * goodscreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the goods
            * goodsupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the goods
            * createruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
            * updateruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * areaid:
          * type: object
          * description: The area associated with the delivered good
          * properties:
            * areaid:
              * type: integer
              * description: The ID of the area
            * areaname:
              * type: string
              * description: The name of the area
            * areacreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the area
            * areaupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the area
        * buildingid:
          * type: object
          * description: The building associated with the delivered good
          * properties:
            * buildingid:
              * type: integer
              * description: The ID of the building
            * buildingname:
              * type: string
              * description: The name of the building
            * buildingabbrivationname:
              * type: string
              * description: The abbreviation name of the building
            * buildingcreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the building
            * buildingupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the building
            * buildingfloorcount:
              * type: integer
              * description: The number of floors in the building
            * buildingroomcount:
              * type: integer
              * description: The number of rooms in the building
        * isAbortion:
          * type: boolean
          * description: Indicates if the delivered good is aborted
        * GoodsId:
          * type: integer
          * description: The ID of the goods (write-only)
* ___
## SubUser Users Owned Property Detail Api

paths:
  * /asset/subuser-owned-property/detail/:
    * get:
      * summary: Retrieve detailed properties owned by subusers
      * description: >
        * Returns detailed information about computers and delivered goods owned by users other than the authenticated user. 
        * Access is restricted to users with administrative privileges or users with a "Supporter" role (user role ID 2). 
        * If the authenticated user is a "Supporter", the results are filtered by the user's working locations.
      * tags:
        * Subuser Owned Property
      * security:
        * bearerAuth: []
      * parameters:
        * name: computer_id
          * in: query
          * required: false
          * schema:
            * type: integer
          * description: The ID of the computer
        * name: deliveredgoods_id
          * in: query
          * required: false
          * schema:
            * type: integer
          * description: The ID of the delivered good
      * responses:
        * '200':
          * description: Details of the computers and delivered goods owned by subusers
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * computers:
                    * type: array
                    * items:
                      * $ref: '#/components/schemas/Computer'
                  * deliveredGoods:
                    * type: array
                    * items:
                      * $ref: '#/components/schemas/DeliveredGoods'
        * '400':
          * description: Invalid request
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error
components:
  * schemas:
    * Computer:
      * type: object
      * properties:
        * computerpropertynumber:
          * type: string
        * computername:
          * type: string
        * computermodel:
          * type: string
        * computerip:
          * type: string
        * computermacaddress:
          * type: string
        * computerispersonal:
          * type: boolean
        * osVersionId:
          * type: integer
          * writeOnly: true
        * computercreatetime:
          * type: string
          * format: date-time
        * computerupdatetime:
          * type: string
          * format: date-time
        * createruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * properties:
            * userpersonalid:
              * type: string
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * operationsystemversionid:
          * type: object
          * properties:
            * operationsystemversionid:
              * type: integer
            * operationsystemversionname:
              * type: string
            * operationsystemname:
              * type: string
            * operationsystemversioncreatetime:
              * type: string
              * format: date-time
            * operationsystemversionupdatetime:
              * type: string
              * format: date-time
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
        * sealing:
          * type: object
          * properties:
            * computerseallingnumber:
              * type: string
            * isexpired:
              * type: boolean
        * relateddeliveredgoods:
          * type: array
          * items:
            * type: object
            * properties:
              * deliveredgoodsid:
                * type: integer
              * deliveredgoodsserial:
                * type: string
              * deliveredgoodscreatetime:
                * type: string
                * format: date-time
              * deliveredgoodsupdatetime:
                * type: string
                * format: date-time
        * isAbortion:
          * type: boolean
    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
          * description: The unique identifier of the delivered good
        * deliveredgoodsserial:
          * type: string
          * description: The serial number of the delivered good
        * deliveredgoodscreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the delivered good
        * deliveredgoodsupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the delivered good
        * createruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * updateruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * owneruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
              * description: The ID of the updater
            * updatercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the updater
            * updaterupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the updater
            * updaterdonetime:
              * type: string
              * format: date-time
              * description: The done time of the updater
        * goodsid:
          * type: object
          * description: The goods associated with the delivered good
          * properties:
            * goodsid:
              * type: integer
              * description: The ID of the goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * gooodsgroupid:
              * type: object
              * properties:
                * gooodsgroupid:
                  * type: integer
                  * description: The ID of the goods group
                * gooodsgroupname:
                  * type: string
                  * description: The name of the goods group
                * gooodsgroupcreatetime:
                  * type: string
                  * format: date-time
                  * description: The creation time of the goods group
                * gooodsgroupupdatetime:
                  * type: string
                  * format: date-time
                  * description: The last update time of the goods group
            * goodscreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the goods
            * goodsupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the goods
            * createruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
            * updateruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * areaid:
          * type: object
          * description: The area associated with the delivered good
          * properties:
            * areaid:
              * type: integer
              * description: The ID of the area
            * areaname:
              * type: string
              * description: The name of the area
            * areacreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the area
            * areaupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the area
        * buildingid:
          * type: object
          * description: The building associated with the delivered good
          * properties:
            * buildingid:
              * type: integer
              * description: The ID of the building
            * buildingname:
              * type: string
              * description: The name of the building
            * buildingabbrivationname:
              * type: string
              * description: The abbreviation name of the building
            * buildingcreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the building
            * buildingupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the building
            * buildingfloorcount:
              * type: integer
              * description: The number of floors in the building
            * buildingroomcount:
              * type: integer
              * description: The number of rooms in the building
        * isAbortion:
          * type: boolean
          * description: Indicates if the delivered good is aborted
        * GoodsId:
          * type: integer
          * description: The ID of the goods (write-only)
* ___
## Submit Ticket Api

paths:
  * /ticket/submit/:
    * post:
      * summary: Submit a new ticket
      * description: Allows authenticated users with "Supporter" or "Usual User" roles to submit a new ticket.
      * tags:
        * Tickets
      * security:
        * bearerAuth: []
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Ticket'
      * responses:
        * '200':
          * description: Ticket successfully submitted
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Ticket'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error
components:
  * schemas:
    * Ticket:
      * type: object
      * properties:
        * ticketid:
          * type: integer
          * description: The unique identifier of the ticket
        * ticketstatusid:
          * type: string
          * description: The status name of the ticket
        * ticketsubjectid:
          * type: string
          * description: The subject name of the ticket
        * createruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * updateruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * ticketcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the ticket
        * ticketupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the ticket
        * ticketdescription:
          * type: string
          * description: The detailed description of the ticket
        * deliveredgoodsid:
          * type: object
          * description: The delivered goods associated with the ticket
          * properties:
            * deliveredgoodsserial:
              * type: string
              * description: The serial number of the delivered goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * areaid:
              * type: string
              * description: The name of the area
            * buildingid:
              * type: string
              * description: The name of the building
        * computerpropertynumber:
          * type: object
          * description: The computer associated with the ticket
          * properties:
            * computername:
              * type: string
              * description: The name of the computer
            * computermodel:
              * type: string
              * description: The model of the computer
            * computerip:
              * type: string
              * description: The IP address of the computer
            * computermacaddress:
              * type: string
              * description: The MAC address of the computer
            * computerispersonal:
              * type: boolean
              * description: Indicates if the computer is personal
            * operationsystem:
              * type: string
              * description: The name of the operating system
            * operationsystemversion:
              * type: string
              * description: The version of the operating system
            * areaid:
              * type: string
              * description: The name of the area
            * buildingid:
              * type: string
              * description: The name of the building
        * TicketSubjectId:
          * type: integer
          * description: The subject ID of the ticket (write-only)
        * DeliveredGoodsiId:
          * type: integer
          * description: The ID of the delivered goods (write-only, optional)
        * ComputerPropertyNumber:
          * type: integer
          * description: The property number of the computer (write-only, optional)
      * description: Fields `deliveredgoodsid` and `computerpropertynumber` are conditionally excluded from the response if they are `None`.
* ___
## Ticket Change Status API
paths:
  * /ticket/change-status/{ticket_id}/:
    * put:
      * summary: Change the status of a ticket
      * description: Allows authenticated users with "Admin" or "Supporter" roles to change the status of a ticket.
      * tags:
        * Tickets
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: ticket_id
          * required: true
          * schema:
            * type: integer
          * description: The ID of the ticket to update
        * in: query
          * name: ticket_status_id
          * required: true
          * schema:
            * type: integer
          * description: The ID of the new ticket status
      * responses:
        * '200':
          * description: Ticket status successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Ticket'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Ticket not found or not accessible
        * '500':
          * description: Internal server error
components:
  * schemas:
    * Ticket:
      * type: object
      * properties:
        * ticketid:
          * type: integer
          * description: The unique identifier of the ticket
        * ticketstatusid:
          * type: string
          * description: The status name of the ticket
        * ticketsubjectid:
          * type: string
          * description: The subject name of the ticket
        * createruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * updateruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * ticketcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the ticket
        * ticketupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the ticket
        * ticketdescription:
          * type: string
          * description: The detailed description of the ticket
        * deliveredgoodsid:
          * type: object
          * description: The delivered goods associated with the ticket
          * properties:
            * deliveredgoodsserial:
              * type: string
              * description: The serial number of the delivered goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * areaid:
              * type: string
              * description: The name of the area
            * buildingid:
              * type: string
              * description: The name of the building
        * computerpropertynumber:
          * type: object
          * description: The computer associated with the ticket
          * properties:
            * computername:
              * type: string
              * description: The name of the computer
            * computermodel:
              * type: string
              * description: The model of the computer
            * computerip:
              * type: string
              * description: The IP address of the computer
            * computermacaddress:
              * type: string
              * description: The MAC address of the computer
            * computerispersonal:
              * type: boolean
              * description: Indicates if the computer is personal
            * operationsystem:
              * type: string
              * description: The name of the operating system
            * operationsystemversion:
              * type: string
              * description: The version of the operating system
            * areaid:
              * type: string
              * description: The name of the area
            * buildingid:
              * type: string
              * description: The name of the building
        * TicketSubjectId:
          * type: integer
          * description: The subject ID of the ticket (write-only)
        * DeliveredGoodsiId:
          * type: integer
          * description: The ID of the delivered goods (write-only, optional)
        * ComputerPropertyNumber:
          * type: integer
          * description: The property number of the computer (write-only, optional)
      * description: Fields `deliveredgoodsid` and `computerpropertynumber` are conditionally excluded from the response if they are `None`.
* ___
## Answer Or Refer Ticket To UpperUser Api

paths:
  * /ticket/answer-or-refer-upperuser/:
    * post:
      * summary: Answer or refer a ticket to an upper user
      * description: >
        * Allows authenticated users to either answer a ticket or refer it to an upper user.
      * tags:
        * Tickets
      * security:
        * bearerAuth: []
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/AnswerOrReferTicket'
      * responses:
        * '200':
          * description: Ticket successfully answered or referred
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * refferedticketdescription:
                    * type: string
                    * description: The description of the referred ticket
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error
components:
  * schemas:
    * AnswerOrReferTicket:
      * type: object
      * properties:
        * ticketid:
          * type: integer
          * description: The ID of the ticket
        * refferedticketdescription:
          * type: string
          * description: The description of the referred ticket
        * isReply:
          * type: boolean
          * description: Indicates if the action is a reply
        * isForward:
          * type: boolean
          * description: Indicates if the action is a forward
    * Ticket:
      * type: object
      * properties:
        * ticketid:
          * type: integer
          * description: The unique identifier of the ticket
        * ticketstatusid:
          * type: integer
          * description: The status ID of the ticket
        * ticketsubjectid:
          * type: integer
          * description: The subject ID of the ticket
        * createruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * updateruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * ticketcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the ticket
        * ticketupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the ticket
        * ticketdescription:
          * type: string
          * description: The detailed description of the ticket
        * deliveredgoodsid:
          * type: integer
          * description: The ID of the delivered goods associated with the ticket
        * computerpropertynumber:
          * type: integer
          * description: The property number of the computer associated with the ticket
* ___
## Ticket List API

paths:
  * /ticket/related/:
    * get:
      * summary: Retrieve related tickets
      * description: >
        * Allows authenticated users to retrieve tickets they have created or that have been referred to them.
      * tags:
        * Tickets
      * security:
        * bearerAuth: []
      * responses:
        * '200':
          * description: List of related tickets
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/TicketHistory'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error
components:
  * schemas:
    * TicketHistory:
      * type: object
      * properties:
        * ticketid:
          * type: integer
          * description: The unique identifier of the ticket
        * ticketstatusid:
          * type: integer
          * description: The status ID of the ticket
        * ticketsubjectid:
          * type: integer
          * description: The subject ID of the ticket
        * createruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * updateruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * ticketcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the ticket
        * ticketupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the ticket
        * ticketdescription:
          * type: string
          * description: The detailed description of the ticket
        * deliveredgoodsid:
          * type: integer
          * description: The ID of the delivered goods associated with the ticket
        * computerpropertynumber:
          * type: integer
          * description: The property number of the computer associated with the ticket
        * referred_tickets:
          * type: array
          * items:
            * $ref: '#/components/schemas/UsersReferredTicket'
    * UsersReferredTicket:
      * type: object
      * properties:
        * reffereduserid:
          * type: integer
          * description: The ID of the user to whom the ticket was referred
        * ticketid:
          * type: integer
          * description: The ID of the referred ticket
        * refferedticketdate:
          * type: string
          * format: date-time
          * description: The date when the ticket was referred
        * refferedticketdescription:
          * type: string
          * description: The description of the referred ticket
* ___
## Ticket Detail API
paths:
  * /ticket/related/{ticket_id}/:
    * get:
      * summary: Retrieve ticket details
      * description: >
        * Allows authenticated users to retrieve details of a ticket they have created or that has been referred to them.
      * tags:
        * Tickets
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: ticket_id
          * required: true
          * schema:
            * type: integer
          * description: The ID of the ticket to retrieve
      * responses:
        * '200':
          * description: Ticket details successfully retrieved
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/TicketHistory'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Ticket not found or not accessible
        * '500':
          * description: Internal server error
components:
  * schemas:
    * TicketHistory:
      * type: object
      * properties:
        * ticketid:
          * type: integer
          * description: The unique identifier of the ticket
        * ticketstatusid:
          * type: integer
          * description: The status ID of the ticket
        * ticketsubjectid:
          * type: integer
          * description: The subject ID of the ticket
        * createruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * updateruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * ticketcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the ticket
        * ticketupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the ticket
        * ticketdescription:
          * type: string
          * description: The detailed description of the ticket
        * deliveredgoodsid:
          * type: integer
          * description: The ID of the delivered goods associated with the ticket
        * computerpropertynumber:
          * type: integer
          * description: The property number of the computer associated with the ticket
        * referred_tickets:
          * type: array
          * items:
            * $ref: '#/components/schemas/UsersReferredTicket'
    * UsersReferredTicket:
      * type: object
      * properties:
        * reffereduserid:
          * type: integer
          * description: The ID of the user to whom the ticket was referred
        * ticketid:
          * type: integer
          * description: The ID of the referred ticket
        * refferedticketdate:
          * type: string
          * format: date-time
          * description: The date when the ticket was referred
        * refferedticketdescription:
          * type: string
          * description: The description of the referred ticket
* ___
## All Ticket Api

paths:
  * /ticket/all/:
    * get:
      * summary: Retrieve all tickets
      * description: >
        * Allows authenticated users with "Admin" role to retrieve all tickets along with their referred tickets.
      * tags:
        * Tickets
      * security:
        * bearerAuth: []
      * responses:
        * '200':
          * description: List of all tickets with referred tickets
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * type: object
                  * properties:
                    * ticket:
                      * $ref: '#/components/schemas/Ticket'
                    * referred_tickets:
                      * type: array
                      * items:
                        * $ref: '#/components/schemas/UsersReferredTicket'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error
components:
  * schemas:
    * Ticket:
      * type: object
      * properties:
        * ticketid:
          * type: integer
          * description: The unique identifier of the ticket
        * ticketstatusid:
          * type: integer
          * description: The status ID of the ticket
        * ticketsubjectid:
          * type: integer
          * description: The subject ID of the ticket
        * createruserid:
           * type: object
           * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * updateruserid:
              * type: object
              * properties:
                * userpersonalid:
                  * type: string
                * username:
                  * type: string
                * userlastname:
                  * type: string
                * userphonenumber:
                  * type: string
                * userlandlinephonenumber:
                  * type: string
                * usercreatetime:
                  * type: string
                  * format: date-time
                * userupdatetime:
                  * type: string
                  * format: date-time
                * userroleid:
                  * type: integer
                * last_login:
                  * type: string
                  * format: date-time
        * ticketcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the ticket
        * ticketupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the ticket
        * ticketdescription:
          * type: string
          * description: The detailed description of the ticket
        * deliveredgoodsid:
          * type: integer
          * description: The ID of the delivered goods associated with the ticket
        * computerpropertynumber:
          * type: integer
          * description: The property number of the computer associated with the ticket
    * UsersReferredTicket:
      * type: object
      * properties:
        * reffereduserid:
          * type: integer
          * description: The ID of the user to whom the ticket was referred
        * ticketid:
          * type: integer
          * description: The ID of the referred ticket
        * refferedticketdate:
          * type: string
          * format: date-time
          * description: The date when the ticket was referred
        * refferedticketdescription:
          * type: string
          * description: The description of the referred ticket
* ___
## Create, Read, Update, Delete Abortion Api

paths:

  * /abortion/:
    * post:
      * summary: Create a new abortion record
      * description: >
        * Allows authenticated admin users to create a new abortion record.
      * tags:
        * Abortion
      * security:
        * bearerAuth: []
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Abortion'
      * responses:
        * '200':
          * description: Abortion record successfully created
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Abortion'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

    * put:
      * summary: Update an abortion record
      * description: >
        * Allows authenticated admin users to update an abortion record by computer ID or delivered goods ID.
      * tags:
        * Abortion
      * security:
        * bearerAuth: []
      * parameters:
        * in: query
          * name: computer_id
          * schema:
            * type: integer
          * description: The ID of the computer to update
        * in: query
          * name: deliveredgoods_id
          * schema:
            * type: integer
          * description: The ID of the delivered goods to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/AbortionEdit'
      * responses:
        * '200':
          * description: Abortion record successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Abortion'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Abortion record not found
        * '500':
          * description: Internal server error

    * patch:
      * summary: Partially update an abortion record
      * description: >
        * Allows authenticated admin users to partially update an abortion record by computer ID or delivered goods ID.
      * tags:
        * Abortion
      * security:
        * bearerAuth: []
      * parameters:
        * in: query
          * name: computer_id
          * schema:
            * type: integer
          * description: The ID of the computer to update
        * in: query
          * name: deliveredgoods_id
          * schema:
            * type: integer
          * description: The ID of the delivered goods to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/AbortionEdit'
      * responses:
        * '200':
          * description: Abortion record successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Abortion'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Abortion record not found
        * '500':
          * description: Internal server error

    * get:
      * summary: Retrieve an abortion record
      * description: >
        * Allows authenticated admin users to retrieve an abortion record by computer ID or delivered goods ID.
      * tags:
        * Abortion
      * security:
        * bearerAuth: []
      * parameters:
        * in: query
          * name: computer_id
          * schema:
            * type: integer
          * description: The ID of the computer to retrieve
        * in: query
          * name: deliveredgoods_id
          * schema:
            * type: integer
          * description: The ID of the delivered goods to retrieve
      * responses:
        * '200':
          * description: Abortion record successfully retrieved
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Abortion'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Abortion record not found
        * '500':
          * description: Internal server error

    * delete:
      * summary: Delete an abortion record
      * description: >
        * Allows authenticated admin users to delete an abortion record by computer ID or delivered goods ID.
      * tags:
        * Abortion
      * security:
        * bearerAuth: []
      * parameters:
        * in: query
          * name: computer_id
          * schema:
            * type: integer
          * description: The ID of the computer to delete
        * in: query
          * name: deliveredgoods_id
          * schema:
            * type: integer
          * description: The ID of the delivered goods to delete
      * responses:
        * '204':
          * description: Abortion record successfully deleted
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Abortion record not found
        * '500':
          * description: Internal server error

components:
  * schemas:
    * Abortion:
      * type: object
      * properties:
        * abortionid:
          * type: integer
          * description: The unique identifier of the abortion record
        * abortioncreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the abortion record
        * abortionupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the abortion record
        * abortiondonetime:
          * type: string
          * format: date-time
          * description: The done time of the abortion record
       *  createruserid:
         * type: object
         * properties:
              * userpersonalid:
              * type: string
              * username:
              * type: string
              * userlastname:
              * type: string
              * userphonenumber:
              * type: string
              * userlandlinephonenumber:
              * type: string
              * usercreatetime:
              * type: string
              * format: date-time
              * userupdatetime:
              * type: string
              * format: date-time
              * userroleid:
              * type: integer
              * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * properties:
               * userpersonalid:
               * type: string
               * username:
               * type: string
               * userlastname:
               * type: string
               * userphonenumber:
               * type: string
               * userlandlinephonenumber:
               * type: string
               * usercreatetime:
               * type: string
               * format: date-time
               * userupdatetime:
               * type: string
               * format: date-time
               * userroleid:
               * type: integer
               * last_login:
               * type: string
               * format: date-time
        * updateruserid:
          * type: object
          * properties:
               * userpersonalid:
               * type: string
               * username:
               * type: string
               * userlastname:
               * type: string
               * userphonenumber:
               * type: string
               * userlandlinephonenumber:
               * type: string
               * usercreatetime:
               * type: string
               * format: date-time
               * userupdatetime:
               * type: string
               * format: date-time
               * userroleid:
               * type: integer
               * last_login:
               * type: string
               * format: date-time
        * deliveredgoodsid:
          * type: object
          * description: The delivered goods associated with the abortion record
          * properties:
            * deliveredgoodsserial:
              * type: string
              * description: The serial number of the delivered goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * areaid:
              * type: string
              * description: The name of the area
            * buildingid:
              * type: string
              * description: The name of the building
        * computerpropertynumber:
          * type: object
          * description: The computer associated with the abortion record
          * properties:
            * computername:
              * type: string
              * description: The name of the computer
            * computermodel:
              * type: string
              * description: The model of the computer
            * computerip:
              * type: string
              * description: The IP address of the computer
            * computermacaddress:
              * type: string
              * description: The MAC address of the computer
            * computerispersonal:
              * type: boolean
              * description: Indicates if the computer is personal
            * operationsystem:
              * type: string
              * description: The name of the operating system
            * operationsystemversion:
              * type: string
              * description: The version of the operating system
            * areaid:
              * type: string
              * description: The name of the area
            * buildingid:
              * type: string
              * description: The name of the building
        * ticketid:
          * type: object
          * description: The ticket associated with the abortion record
          * properties:
            * ticketid:
              * type: integer
              * description: The ID of the ticket
            * ticketdescription:
              * type: string
              * description: The description of the ticket

    * AbortionEdit:
      * type: object
      * properties:
        * abortiondonetime:
          * type: string
          * format: date
          * description: The done time of the abortion record
* ___
## Internal Repair Api

paths:
  * /internal-repair/:
    * get:
      * summary: Retrieve a list of internal repairs
      * description: >
        * Allows authenticated admin users to retrieve a list of internal repairs.
      * tags:
        * InternalRepair
      * security:
        * bearerAuth: []
      * responses:
        * '200':
          * description: List of internal repairs successfully retrieved
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/InternalRepair'
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

    * post:
      * summary: Create a new internal repair record
      * description: >
        * Allows authenticated admin users to create a new internal repair record.
      * tags:
        * InternalRepair
      * security:
        * bearerAuth: []
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/InternalRepair'
      * responses:
        * '201':
          * description: Internal repair record successfully created
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/InternalRepair'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

components:
  * schemas:
    * InternalRepair:
      * type: object
      * properties:
        * internalrepairid:
          * type: integer
          * description: The unique identifier of the internal repair record
        * internalrepairdescription:
          * type: string
          * description: The description of the internal repair
        * internalrepairchangingdescription:
          * type: string
          * description: The changing description of the internal repair
        * internalrepaircreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the internal repair record
        * internalrepairupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the internal repair record
        * internalrepairdonetime:
          * type: string
          * format: date-time
          * description: The done time of the internal repair record
        * createruserid:
          * type: object
          * properties:
               * userpersonalid:
               * type: string
               * username:
               * type: string
               * userlastname:
               * type: string
               * userphonenumber:
               * type: string
               * userlandlinephonenumber:
               * type: string
               * usercreatetime:
               * type: string
               * format: date-time
               * userupdatetime:
               * type: string
               * format: date-time
               * userroleid:
               * type: integer
               * last_login:
               * type: string
               * format: date-time
        * updateruserid:
          * type: object
          * properties:
               * userpersonalid:
               * type: string
               * username:
               * type: string
               * userlastname:
               * type: string
               * userphonenumber:
               * type: string
               * userlandlinephonenumber:
               * type: string
               * usercreatetime:
               * type: string
               * format: date-time
               * userupdatetime:
               * type: string
               * format: date-time
               * userroleid:
               * type: integer
               * last_login:
               * type: string
               * format: date-time
        * deliveredgoodsid:
          * type: object
          * description: The delivered goods associated with the internal repair record
          * properties:
            * deliveredgoodsserial:
              * type: string
              * description: The serial number of the delivered goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * areaid:
              * type: string
              * description: The name of the area
            * buildingid:
              * type: string
              * description: The name of the building
        * ticketid:
          * type: object
          * description: The ticket associated with the internal repair record
          * properties:
            * ticketid:
              * type: integer
              * description: The ID of the ticket
            * ticketdescription:
              * type: string
              * description: The description of the ticket

    * InternalRepairEdit:
      * type: object
      * properties:
        * internalrepairdescription:
          * type: string
          * description: The description of the internal repair
        * internalrepairchangingdescription:
          * type: string
          * description: The changing description of the internal repair
        * internalrepairdonetime:
          * type: string
          * format: date
          * description: The done time of the internal repair record
        * TicketId:
          * type: integer
          * description: The ID of the ticket associated with the internal repair record
        * DeliveredGoodsiId:
          * type: integer
          * description: The ID of the delivered goods associated with the internal repair record
* ___
## Detail, Update, Delete InternalRepair Api

  * /internal-repair/{pk}/:
    * get:
      * summary: Retrieve an internal repair record
      * description: >
        * Allows authenticated admin users to retrieve an internal repair record by ID.
      * tags:
        * InternalRepair
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: pk
          * required: true
          * schema:
            * type: integer
          * description: The ID of the internal repair record to retrieve
      * responses:
        * '200':
          * description: Internal repair record successfully retrieved
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/InternalRepair'
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Internal repair record not found
        * '500':
          * description: Internal server error

    * put:
      * summary: Update an internal repair record
      * description: >
        * Allows authenticated admin users to update an internal repair record by ID.
      * tags:
        * InternalRepair
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: pk
          * required: true
          * schema:
            * type: integer
          * description: The ID of the internal repair record to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/InternalRepairEdit'
      * responses:
        * '200':
          * description: Internal repair record successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/InternalRepair'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Internal repair record not found
        * '500':
          * description: Internal server error

    * patch:
      * summary: Partially update an internal repair record
      * description: >
        * Allows authenticated admin users to partially update an internal repair record by ID.
      * tags:
        * InternalRepair
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: pk
          * required: true
          * schema:
            * type: integer
          * description: The ID of the internal repair record to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/InternalRepairEdit'
      * responses:
        * '200':
          * description: Internal repair record successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/InternalRepair'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Internal repair record not found
        * '500':
          * description: Internal server error

    * delete:
      * summary: Delete an internal repair record
      * description: >
        * Allows authenticated admin users to delete an internal repair record by ID.
      * tags:
        * InternalRepair
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: pk
          * required: true
          * schema:
            * type: integer
          * description: The ID of the internal repair record to delete
      * responses:
        * '204':
          * description: Internal repair record successfully deleted
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Internal repair record not found
        * '500':
          * description: Internal server error

components:
  * schemas:
    * InternalRepair:
      * type: object
      * properties:
        * internalrepairid:
          * type: integer
          * description: The unique identifier of the internal repair record
        * internalrepairdescription:
          * type: string
          * description: The description of the internal repair
        * internalrepairchangingdescription:
          * type: string
          * description: The changing description of the internal repair
        * internalrepaircreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the internal repair record
        * internalrepairupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the internal repair record
        * internalrepairdonetime:
          * type: string
          * format: date-time
          * description: The done time of the internal repair record
        * createruserid:
          * type: object
          * properties:
               * userpersonalid:
               * type: string
               * username:
               * type: string
               * userlastname:
               * type: string
               * userphonenumber:
               * type: string
               * userlandlinephonenumber:
               * type: string
               * usercreatetime:
               * type: string
               * format: date-time
               * userupdatetime:
               * type: string
               * format: date-time
               * userroleid:
               * type: integer
               * last_login:
               * type: string
               * format: date-time
        * updateruserid:
          * type: object
          * properties:
               * userpersonalid:
               * type: string
               * username:
               * type: string
               * userlastname:
               * type: string
               * userphonenumber:
               * type: string
               * userlandlinephonenumber:
               * type: string
               * usercreatetime:
               * type: string
               * format: date-time
               * userupdatetime:
               * type: string
               * format: date-time
               * userroleid:
               * type: integer
               * last_login:
               * type: string
               * format: date-time
        * deliveredgoodsid:
          * type: object
          * description: The delivered goods associated with the internal repair record
          * properties:
            * deliveredgoodsserial:
              * type: string
              * description: The serial number of the delivered goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * areaid:
              * type: string
              * description: The name of the area
            * buildingid:
              * type: string
              * description: The name of the building
        * ticketid:
          * type: object
          * description: The ticket associated with the internal repair record
          * properties:
            * ticketid:
              * type: integer
              * description: The ID of the ticket
            * ticketdescription:
              * type: string
              * description: The description of the ticket

    * InternalRepairEdit:
      * type: object
      * properties:
        * internalrepairdescription:
          * type: string
          * description: The description of the internal repair
        * internalrepairchangingdescription:
          * type: string
          * description: The changing description of the internal repair
        * internalrepairdonetime:
          * type: string
          * format: date
          * description: The done time of the internal repair record
        * TicketId:
          * type: integer
          * description: The ID of the ticket associated with the internal repair record
        * DeliveredGoodsiId:
          * type: integer
          * description: The ID of the delivered goods associated with the internal repair record
* ___
## Update, Delete Internal Repair Related Sealing Api
  * /internal-repair/related-sealing/{sealingid}/{internalrepaireid}/:
    * put:
      * summary: Link a sealing to an internal repair
      * description: >
        * Allows authenticated admin users to link a sealing to an internal repair.
      * tags:
        * InternalRepair
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: sealingid
          * required: true
          * schema:
            * type: integer
          * description: The ID of the sealing to link
        * in: path
          * name: internalrepaireid
          * required: true
          * schema:
            * type: integer
          * description: The ID of the internal repair to link
      * responses:
        * '200':
          * description: Sealing successfully linked to internal repair
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ComputerSealling'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Sealing or internal repair not found
        * '500':
          * description: Internal server error

    * patch:
      * summary: Partially update the link between a sealing and an internal repair
      * description: >
        * Allows authenticated admin users to partially update the link between a sealing and an internal repair.
      * tags:
        * InternalRepair
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: sealingid
          * required: true
          * schema:
            * type: integer
          * description: The ID of the sealing to link
        * in: path
          * name: internalrepaireid
          * required: true
          * schema:
            * type: integer
          * description: The ID of the internal repair to link
      * responses:
        * '200':
          * description: Sealing successfully linked to internal repair
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ComputerSealling'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Sealing or internal repair not found
        * '500':
          * description: Internal server error

    * delete:
      * summary: Unlink a sealing from an internal repair
      * description: >
        * Allows authenticated admin users to unlink a sealing from an internal repair.
      * tags:
        * InternalRepair
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: sealingid
          * required: true
          * schema:
            * type: integer
          * description: The ID of the sealing to unlink
        * in: path
          * name: internalrepaireid
          * required: true
          * schema:
            * type: integer
          * description: The ID of the internal repair to unlink
      * responses:
        * '204':
          * description: Sealing successfully unlinked from internal repair
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Sealing or internal repair not found
        * '500':
          * description: Internal server error
    * ComputerSealling:
      * type: object
      * properties:
        * computerseallingid:
          * type: integer
        * computerseallingnumber:
          * type: string
        * computerseallingcreatetime:
          * type: string
          * format: date-time
        * computerseallingupdatetime:
          * type: string
          * format: date-time
        * isexpired:
          * type: boolean
        * updaterid:
          * type: object
          * properties:
            * updaterid:
              * type: integer
            * updatercreatetime:
              * type: string
              * format: date-time
            * updaterupdatetime:
              * type: string
              * format: date-time
            * updaterdonetime:
              * type: string
              * format: date-time
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
        * internalrepairid:
          * type: object
          * properties:
            * internalrepairid:
              * type: integer
            * internalrepairdescription:
              * type: string
            * internalrepairchangingdescription:
              * type: string
            * internalrepaircreatetime:
              * type: string
              * format: date-time
            * internalrepairupdatetime:
              * type: string
              * format: date-time
            * internalrepairdonetime:
              * type: string
              * format: date-time
* ___
## Create, List Outbound Document Api
paths:
  * /outbound-document/:
    * get:
      * summary: Retrieve a list of outbound documents
      * description: >
        * Allows authenticated admin users to retrieve a list of outbound documents.
      * tags:
        * OutboundDocument
      * security:
        * bearerAuth: []
      * responses:
        * '200':
          * description: List of outbound documents successfully retrieved
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/OutboundDocument'
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

    * post:
      * summary: Create a new outbound document
      * description: >
        * Allows authenticated admin users to create a new outbound document.
      * tags:
        * OutboundDocument
      * security:
        * bearerAuth: []
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/OutboundDocument'
      * responses:
        * '201':
          * description: Outbound document successfully created
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/OutboundDocument'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

components:
  * schemas:
    * OutboundDocument:
      * type: object
      * properties:
        * outbounddocumentserial:
          * type: string
          * description: The serial number of the outbound document
        * outbounddocumentdescription:
          * type: string
          * description: The description of the outbound document
        * outbounddocumentdonetime:
          * type: string
          * format: date-time
          * description: The done time of the outbound document
        * TicketId:
          * type: integer
          * description: The ID of the related ticket
        * DeliveredGoodsiId:
          * type: integer
          * description: The ID of the delivered goods
        * outbounddocumentcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the outbound document
        * outbounddocumentupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the outbound document
        * createruserid:
          * type: object
          * description: The user who created the outbound document
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * owneruserid:
          * type: object
          * description: The owner user of the outbound document
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * updateruserid:
          * type: object
          * description: The user who last updated the outbound document
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * deliveredgoodsid:
          * type: object
          * description: The delivered goods related to the outbound document
          * properties:
            * deliveredgoodsserial:
              * type: string
              * description: The serial number of the delivered goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * areaid:
              * type: integer
              * description: The area ID of the delivered goods
            * buildingid:
              * type: integer
              * description: The building ID of the delivered goods
        * ticketid:
          * type: object
          * description: The ticket related to the outbound document
          * properties:
            * ticketid:
              * type: integer
              * description: The ID of the ticket
            * ticketdescription:
              * type: string
              * description: The description of the ticket
* ___
## Detail,Update,Delete OutboundDocument Api

paths:
  * /outbound-document/{pk}/:
    * get:
      * summary: Retrieve an outbound document
      * description: >
        * Allows authenticated admin users to retrieve an outbound document by ID.
      * tags:
        * OutboundDocument
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: pk
          * required: true
          * schema:
            * type: integer
          * description: The ID of the outbound document to retrieve
      * responses:
        * '200':
          * description: Outbound document successfully retrieved
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/OutboundDocument'
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Outbound document not found
        * '500':
          * description: Internal server error

    * put:
      * summary: Update an outbound document
      * description: >
        * Allows authenticated admin users to update an outbound document by ID.
      * tags:
        * OutboundDocument
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: pk
          * required: true
          * schema:
            * type: integer
          * description: The ID of the outbound document to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/OutboundDocument'
      * responses:
        * '200':
          * description: Outbound document successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/OutboundDocument'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Outbound document not found
        * '500':
          * description: Internal server error

    * patch:
      * summary: Partially update an outbound document
      * description: >
        * Allows authenticated admin users to partially update an outbound document by ID.
      * tags:
        * OutboundDocument
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: pk
          * required: true
          * schema:
            * type: integer
          * description: The ID of the outbound document to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/OutboundDocument'
      * responses:
        * '200':
          * description: Outbound document successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/OutboundDocument'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Outbound document not found
        * '500':
          * description: Internal server error

    * delete:
      * summary: Delete an outbound document
      * description: >
        * Allows authenticated admin users to delete an outbound document by ID.
      * tags:
        * OutboundDocument
      * security:
        * bearerAuth: []
      * parameters:
        * in: path
          * name: pk
          * required: true
          * schema:
            * type: integer
          * description: The ID of the outbound document to delete
      * responses:
        * '204':
          * description: Outbound document successfully deleted
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Outbound document not found
        * '500':
          * description: Internal server error

components:
  * schemas:
    * OutboundDocument:
      * type: object
      * properties:
        * outbounddocumentserial:
          * type: string
          * description: The serial number of the outbound document
        * outbounddocumentdescription:
          * type: string
          * description: The description of the outbound document
        * outbounddocumentdonetime:
          * type: string
          * format: date-time
          * description: The done time of the outbound document
        * TicketId:
          * type: integer
          * description: The ID of the related ticket
        * DeliveredGoodsiId:
          * type: integer
          * description: The ID of the delivered goods
        * outbounddocumentcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the outbound document
        * outbounddocumentupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the outbound document
        * createruserid:
          * type: object
          * description: The user who created the outbound document
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * owneruserid:
          * type: object
          * description: The owner user of the outbound document
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * updateruserid:
          * type: object
          * description: The user who last updated the outbound document
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * deliveredgoodsid:
          * type: object
          * description: The delivered goods related to the outbound document
          * properties:
            * deliveredgoodsserial:
              * type: string
              * description: The serial number of the delivered goods
            * goodsname:
              * type: string
              * description: The name of the goods
            * areaid:
              * type: integer
              * description: The area ID of the delivered goods
            * buildingid:
              * type: integer
              * description: The building ID of the delivered goods
        * ticketid:
          * type: object
          * description: The ticket related to the outbound document
          * properties:
            * ticketid:
              * type: integer
              * description: The ID of the ticket
            * ticketdescription:
              * type: string
              * description: The description of the ticket
* ___
## List, Create Software API
paths:
  * /software/:
    * get:
      * summary: Retrieve a list of software
      * description: >
        * Allows authenticated admin users to retrieve a list of software.
      * tags:
        * Software
      * security:
        * bearerAuth: []
      * responses:
        * '200':
          * description: List of software successfully retrieved
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/Software'
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

    * post:
      * summary: Create a new software record
      * description: >
        * Allows authenticated admin users to create a new software record.
      * tags:
        * Software
      * security:
        * bearerAuth: []
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Software'
      * responses:
        * '201':
          * description: Software record successfully created
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Software'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

components:
  * schemas:
    * Software:
      * type: object
      * properties:
        * softwareid:
          * type: integer
          * description: The unique identifier of the software record
        * softwarename:
          * type: string
          * description: The name of the software
        * softwarecreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the software record
        * softwareupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the software record
        * createruserid:
          * type: object
          * description: The user who created the software record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * updateruserid:
          * type: object
          * description: The user who last updated the software record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
* ___
## Detail, Update, Destroy Software API

paths:
  * /software/{id}/:
    * get:
      * summary: Retrieve software details
      * description: >
        * Allows authenticated admin users to retrieve details of a specific software by its ID.
      * tags:
        * Software
      * security:
        * bearerAuth: []
      * parameters:
        * name: id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the software to retrieve
      * responses:
        * '200':
          * description: Software details successfully retrieved
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Software'
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Software with the specified ID does not exist
        * '500':
          * description: Internal server error

    * put:
      * summary: Update software details
      * description: >
        * Allows authenticated admin users to update details of a specific software by its ID.
      * tags:
        * Software
      * security:
        * bearerAuth: []
      * parameters:
        * name: id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the software to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Software'
      * responses:
        * '200':
          * description: Software details successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Software'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Software with the specified ID does not exist
        * '500':
          * description: Internal server error

    * delete:
      * summary: Delete software
      * description: >
        * Allows authenticated admin users to delete a specific software by its ID.
      * tags:
        * Software
      * security:
        * bearerAuth: []
      * parameters:
        * name: id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the software to delete
      * responses:
        * '204':
          * description: Software successfully deleted
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Software with the specified ID does not exist
        * '500':
          * description: Internal server error

components:
  * schemas:
    * Software:
      * type: object
      * properties:
        * softwareid:
          * type: integer
          * description: The unique identifier of the software record
        * softwarename:
          * type: string
          * description: The name of the software
        * softwarecreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the software record
        * softwareupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the software record
        * createruserid:
          * type: object
          * description: The user who created the software record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * updateruserid:
          * type: object
          * description: The user who last updated the software record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
* ___
## List, Create Installation API

paths:
  * /installation/:
    * get:
      * summary: Retrieve a list of installations
      * description: >
        * Allows authenticated admin or supporter users to retrieve a list of installations.
      * tags:
        * Installation
      * security:
        * bearerAuth: []
      * responses:
        * '200':
          * description: List of installations successfully retrieved
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/Installation'
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

    * post:
      * summary: Create a new installation record
      * description: >
        * Allows authenticated admin or supporter users to create a new installation record.
      * tags:
        * Installation
      * security:
        * bearerAuth: []
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Installation'
      * responses:
        * '201':
          * description: Installation record successfully created
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Installation'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

components:
  * schemas:
    * Installation:
      * type: object
      * properties:
        * installationid:
          * type: integer
          * description: The unique identifier of the installation record
        * installationdescription:
          * type: string
          * description: The description of the installation
        * installationcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the installation record
        * installationupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the installation record
        * installationdonetime:
          * type: string
          * format: date
          * description: The completion date of the installation
        * TicketId:
          * type: integer
          * description: The ID of the related ticket
        * computerpropertynumber:
          * type: integer
          * description: The property number of the computer
        * ticketid:
          * type: object
          * description: The related ticket details
          * properties:
            * ticketid:
              * type: integer
              * description: The unique identifier of the ticket
            * ticketdescription:
              * type: string
              * description: The description of the ticket
        * createruserid:
          * type: object
          * description: The user who created the installation record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * updateruserid:
          * type: object
          * description: The user who last updated the installation record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
* ___
## Detail, Update, Destroy Installation API

paths:
  * /installation/{id}/:
    * get:
      * summary: Retrieve installation details
      * description: >
        * Allows authenticated admin or supporter users to retrieve details of a specific installation by its ID.
      * tags:
        * Installation
      * security:
        * bearerAuth: []
      * parameters:
        * name: id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the installation to retrieve
      * responses:
        * '200':
          * description: Installation details successfully retrieved
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Installation'
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Installation with the specified ID does not exist
        * '500':
          * description: Internal server error

    * put:
      * summary: Update installation details
      * description: >
        * Allows authenticated admin or supporter users to update details of a specific installation by its ID.
      * tags:
        * Installation
      * security:
        * bearerAuth: []
      * parameters:
        * name: id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the installation to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Installation'
      * responses:
        * '200':
          * description: Installation details successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Installation'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Installation with the specified ID does not exist
        * '500':
          * description: Internal server error

    * delete:
      * summary: Delete installation
      * description: >
        * Allows authenticated admin or supporter users to delete a specific installation by its ID.
      * tags:
        * Installation
      * security:
        * bearerAuth: []
      * parameters:
        * name: id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the installation to delete
      * responses:
        * '204':
          * description: Installation successfully deleted
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Installation with the specified ID does not exist
        * '500':
          * description: Internal server error

components:
  * schemas:
    * Installation:
      * type: object
      * properties:
        * installationid:
          * type: integer
          * description: The unique identifier of the installation record
        * installationdescription:
          * type: string
          * description: The description of the installation
        * installationcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the installation record
        * installationupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the installation record
        * installationdonetime:
          * type: string
          * format: date
          * description: The completion date of the installation
        * TicketId:
          * type: integer
          * description: The ID of the related ticket
        * computerpropertynumber:
          * type: integer
          * description: The property number of the computer
        * ticketid:
          * type: object
          * description: The related ticket details
          * properties:
            * ticketid:
              * type: integer
              * description: The unique identifier of the ticket
            * ticketdescription:
              * type: string
              * description: The description of the ticket
        * createruserid:
          * type: object
          * description: The user who created the installation record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * updateruserid:
          * type: object
          * description: The user who last updated the installation record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
* ___
## Detail, Update, Destroy  Installizati On soncomputer API

paths:
  * /installation-on-computer/{installizations_id}/{computerpropertynumber}/:
    * get:
      * summary: Retrieve installation on computer details
      * description: >
        * Allows authenticated admin or supporter users to retrieve details of an installation on a specific computer by its installation ID and computer property number.
      * tags:
        * Installation
      * security:
        * bearerAuth: []
      * parameters:
        * name: installizations_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the installation to retrieve
        * name: computerpropertynumber
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The property number of the computer
      * responses:
        * '200':
          * description: Installation on computer details successfully retrieved
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/InstallizationsOnComputer'
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden You do not have permission to access this installation
        * '404':
          * description: Not Found Installation or computer with the specified ID does not exist
        * '500':
          * description: Internal server error

    * put:
      * summary: Update installation on computer details
      * description: >
        * Allows authenticated admin or supporter users to update details of an installation on a specific computer by its installation ID and computer property number.
      * tags:
        * Installation
      * security:
        * bearerAuth: []
      * parameters:
        * name: installizations_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the installation to update
        * name: computerpropertynumber
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The property number of the computer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/InstallizationsOnComputer'
      * responses:
        * '200':
          * description: Installation on computer details successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/InstallizationsOnComputer'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden You do not have permission to update this installation
        * '404':
          * description: Not Found Installation or computer with the specified ID does not exist
        * '500':
          * description: Internal server error

    * delete:
      * summary: Delete installation on computer
      * description: >
        * Allows authenticated admin or supporter users to delete an installation on a specific computer by its installation ID and computer property number.
      * tags:
        * Installation
      * security:
        * bearerAuth: []
      * parameters:
        * name: installizations_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the installation to delete
        * name: computerpropertynumber
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The property number of the computer
      * responses:
        * '204':
          * description: Installation on computer successfully deleted
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden You do not have permission to delete this installation
        * '404':
          * description: Not Found Computer with the specified property number does not exist
        * '500':
          * description: Internal server error

components:
  * schemas:
    * InstallizationsOnComputer:
      * type: object
      * properties:
        * installationid:
          * type: integer
          * description: The unique identifier of the installation
        * computerpropertynumber:
          * type: integer
          * description: The property number of the computer
        * installationdescription:
          * type: string
          * description: The description of the installation
        * installationcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the installation
        * installationupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the installation
        * installationdonetime:
          * type: string
          * format: date
          * description: The completion date of the installation
        * TicketId:
          * type: integer
          * description: The ID of the related ticket
        * createruserid:
          * type: object
          * description: The user who created the installation
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * updateruserid:
          * type: object
          * description: The user who last updated the installation
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
* ___
## Create, Update, Delete, Get SoftwareUsageInInstallization Api

paths:
  * /software-usage-in-installization/{software_id}/{instalation_id}/:
    * get:
      * summary: Retrieve software usage in installation details
      * description: >
        * Allows authenticated admin or supporter users to retrieve details of software usage in a specific installation by its software ID and installation ID.
      * tags:
        * Software Usage
      * security:
        * bearerAuth: []
      * parameters:
        * name: software_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the software to retrieve
        * name: instalation_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the installation to retrieve
      * responses:
        * '200':
          * description: Software usage in installation details successfully retrieved
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/SoftwareUsageInInstallization'
        * '400':
          * description: Bad Request Invalid software or installation ID
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden You do not have permission to access this installation
        * '404':
          * description: Not Found Software or installation with the specified ID does not exist
        * '500':
          * description: Internal server error

    * post:
      * summary: Create software usage in installation
      * description: >
        * Allows authenticated admin or supporter users to create a record of software usage in a specific installation by its software ID and installation ID.
      * tags:
        * Software Usage
      * security:
        * bearerAuth: []
      * parameters:
        * name: software_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the software to create
        * name: instalation_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the installation to create
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/SoftwareUsageInInstallization'
      * responses:
        * '200':
          * description: Software usage in installation successfully created
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/SoftwareUsageInInstallization'
        * '400':
          * description: Bad Request Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

    * put:
      * summary: Update software usage in installation
      * description: >
        * Allows authenticated admin or supporter users to update a record of software usage in a specific installation by its software ID and installation ID.
      * tags:
        * Software Usage
      * security:
        * bearerAuth: []
      * parameters:
        * name: software_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the software to update
        * name: instalation_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the installation to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/SoftwareUsageInInstallization'
      * responses:
        * '200':
          * description: Software usage in installation successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/SoftwareUsageInInstallization'
        * '400':
          * description: Bad Request Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden You do not have permission to update this installation
        * '404':
          * description: Not Found Software or installation with the specified ID does not exist
        * '500':
          * description: Internal server error

    * delete:
      * summary: Delete software usage in installation
      * description: >
        * Allows authenticated admin or supporter users to delete a record of software usage in a specific installation by its software ID and installation ID.
      * tags:
        * Software Usage
      * security:
        * bearerAuth: []
      * parameters:
        * name: software_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the software to delete
        * name: instalation_id
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the installation to delete
      * responses:
        * '204':
          * description: Software usage in installation successfully deleted
        * '400':
          * description: Bad Request Invalid software or installation ID
        * '401':
          * description: Unauthorized Authentication is required
        * '403':
          * description: Forbidden You do not have permission to delete this installation
        * '404':
          * description: Not Found Software or installation with the specified ID does not exist
        * '500':
          * description: Internal server error

components:
  * schemas:
    * SoftwareUsageInInstallization:
      * type: object
      * properties:
        * installationid:
          * type: integer
          * description: The unique identifier of the installation
        * softwareid:
          * type: integer
          * description: The unique identifier of the software
        * usageofsoftwaresininstallization:
          * type: string
          * description: The usage details of the software in the installation
* ___
## List, Create UpdateDeliveredGoods API

paths:
  * /update-delivered-goods/:
    * get:
      * summary: Retrieve a list of delivered goods updates
      * description: >
        * Allows authenticated admin users to retrieve a list of delivered goods updates.
      * tags:
        * Delivered Goods
      * security:
        * bearerAuth: []
      * responses:
        * '200':
          * description: List of delivered goods updates successfully retrieved
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/UpdateDeliveredGoods'
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

    * post:
      * summary: Create a new delivered goods update
      * description: >
        * Allows authenticated admin users to create a new delivered goods update.
      * tags:
        * Delivered Goods
      * security:
        * bearerAuth: []
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/UpdateDeliveredGoods'
      * responses:
        * '201':
          * description: Delivered goods update successfully created
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/UpdateDeliveredGoods'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

components:
  * schemas:
    * UpdateDeliveredGoods:
      * type: object
      * properties:
        * updaterid:
          * type: integer
          * description: The unique identifier of the update record
        * updatercreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the update record
        * updaterupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the update record
        * updaterdonetime:
          * type: string
          * format: date
          * description: The completion date of the update
        * TicketId:
          * type: integer
          * description: The ID of the related ticket
        * Owneruserid:
          * type: integer
          * description: The ID of the owner user
        * createruserid:
          * type: object
          * description: The user who created the update record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * updateruserid:
          * type: object
          * description: The user who last updated the update record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
        * ticketid:
          * type: object
          * description: The related ticket details
          * properties:
            * ticketid:
              * type: integer
              * description: The unique identifier of the ticket
            * ticketdescription:
              * type: string
              * description: The description of the ticket
        * deactivate_replacements:
          * type: array
          * description: The list of deactivated replacements
          * items:
            * $ref: '#/components/schemas/ReplacementDeliveredGoods'
        * delivered_goods:
          * type: array
          * description: The list of delivered goods
          * items:
            * $ref: '#/components/schemas/DeliveredGoods'

    * ReplacementDeliveredGoods:
      * type: object
      * properties:
        * replacementid:
          * type: integer
          * description: The unique identifier of the replacement
        * deliveredgoodsid:
          * type: integer
          * description: The ID of the delivered goods
        * updaterid:
          * type: integer
          * description: The ID of the updater

    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
          * description: The unique identifier of the delivered goods
        * goodsname:
          * type: string
          * description: The name of the delivered goods
        * goodsdescription:
          * type: string
          * description: The description of the delivered goods
        * goodsquantity:
          * type: integer
          * description: The quantity of the delivered goods
        * goodscreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the delivered goods
        * goodsupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the delivered goods
* ___
## Detail, Update, Destroy UpdateDeliveredGoods API

paths:
  * /update-delivered-goods/{pk}/:
    * get:
      * summary: Retrieve delivered goods update details
      * description: >
        * Allows authenticated admin users to retrieve details of a specific delivered goods update by its ID.
      * tags:
        * Delivered Goods
      * security:
        * bearerAuth: []
      * parameters:
        * name: pk
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the delivered goods update to retrieve
      * responses:
        * '200':
          * description: Delivered goods update details successfully retrieved
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/UpdateDeliveredGoods'
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Delivered goods update with the specified ID does not exist
        * '500':
          * description: Internal server error

    * put:
      * summary: Update delivered goods update details
      * description: >
        * Allows authenticated admin users to update details of a specific delivered goods update by its ID.
      * tags:
        * Delivered Goods
      * security:
        * bearerAuth: []
      * parameters:
        * name: pk
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the delivered goods update to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/UpdateDeliveredGoods'
      * responses:
        * '200':
          * description: Delivered goods update details successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/UpdateDeliveredGoods'
        * '400':
          * description: Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Delivered goods update with the specified ID does not exist
        * '500':
          * description: Internal server error

    * delete:
      * summary: Delete delivered goods update
      * description: >
        * Allows authenticated admin users to delete a specific delivered goods update by its ID.
      * tags:
        * Delivered Goods
      * security:
        * bearerAuth: []
      * parameters:
        * name: pk
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the delivered goods update to delete
      * responses:
        * '204':
          * description: Delivered goods update successfully deleted
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Delivered goods update with the specified ID does not exist
        * '500':
          * description: Internal server error

components:
  * schemas:
    * UpdateDeliveredGoods:
      * type: object
      * properties:
        * updaterid:
          * type: integer
          * description: The unique identifier of the update record
        * updatercreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the update record
        * updaterupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the update record
        * updaterdonetime:
          * type: string
          * format: date
          * description: The completion date of the update
        * TicketId:
          * type: integer
          * description: The ID of the related ticket
        * Owneruserid:
          * type: integer
          * description: The ID of the owner user
        * createruserid:
          * type: object
          * description: The user who created the update record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * updateruserid:
          * type: object
          * description: The user who last updated the update record
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
        * ticketid:
          * type: object
          * description: The related ticket details
          * properties:
            * ticketid:
              * type: integer
              * description: The unique identifier of the ticket
            * ticketdescription:
              * type: string
              * description: The description of the ticket
        * deactivate_replacements:
          * type: array
          * description: The list of deactivated replacements
          * items:
            * $ref: '#/components/schemas/ReplacementDeliveredGoods'
        * delivered_goods:
          * type: array
          * description: The list of delivered goods
          * items:
            * $ref: '#/components/schemas/DeliveredGoods'

    * ReplacementDeliveredGoods:
      * type: object
      * properties:
        * replacementid:
          * type: integer
          * description: The unique identifier of the replacement
        * deliveredgoodsid:
          * type: integer
          * description: The ID of the delivered goods
        * updaterid:
          * type: integer
          * description: The ID of the updater

    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
          * description: The unique identifier of the delivered goods
        * goodsname:
          * type: string
          * description: The name of the delivered goods
        * goodsdescription:
          * type: string
          * description: The description of the delivered goods
        * goodsquantity:
          * type: integer
          * description: The quantity of the delivered goods
        * goodscreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the delivered goods
        * goodsupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the delivered goods
* ___
## Update, Destroy UpdaterRelatedSealing Api

paths:
  * /update-delivered-goods/related-sealing/{sealingid}/{updaterid}/:
    * put:
      * summary: Update sealing related to updater
      * description: >
        * Allows authenticated admin users to update the sealing related to a specific updater by its sealing ID and updater ID.
      * tags:
        * Sealing
      * security:
        * bearerAuth: []
      * parameters:
        * name: sealingid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the sealing to update
        * name: updaterid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the updater to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ComputerSealling'
      * responses:
        * '200':
          * description: Sealing related to updater successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ComputerSealling'
        * '400':
          * description: Bad Request Invalid request data or internal repair ID is not None
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Sealing or updater with the specified ID does not exist
        * '500':
          * description: Internal server error

    * patch:
      * summary: Partially update sealing related to updater
      * description: >
        * Allows authenticated admin users to partially update the sealing related to a specific updater by its sealing ID and updater ID.
      * tags:
        * Sealing
      * security:
        * bearerAuth: []
      * parameters:
        * name: sealingid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the sealing to update
        * name: updaterid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the updater to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ComputerSealling'
      * responses:
        * '200':
          * description: Sealing related to updater successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ComputerSealling'
        * '400':
          * description: Bad Request Invalid request data or internal repair ID is not None
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Sealing or updater with the specified ID does not exist
        * '500':
          * description: Internal server error

    * delete:
      * summary: Delete sealing related to updater
      * description: >
        * Allows authenticated admin users to delete the sealing related to a specific updater by its sealing ID and updater ID.
      * tags:
        * Sealing
      * security:
        * bearerAuth: []
      * parameters:
        * name: sealingid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the sealing to delete
        * name: updaterid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the updater to delete
      * responses:
        * '204':
          * description: Sealing related to updater successfully deleted
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Sealing or updater with the specified ID does not exist
        * '500':
          * description: Internal server error

components:
  * schemas:
    * ComputerSealling:
      * type: object
      * properties:
        * computerseallingid:
          * type: integer
          * description: The unique identifier of the computer sealing
        * computerseallingnumber:
          * type: string
          * description: The number of the computer sealing
        * computerseallingcreatetime:
          * type: string
          * format: date-time
          * description: The creation time of the computer sealing
        * computerseallingupdatetime:
          * type: string
          * format: date-time
          * description: The last update time of the computer sealing
        * isexpired:
          * type: boolean
          * description: Whether the computer sealing is expired
        * updaterid:
          * type: object
          * description: The updater details
          * properties:
            * updaterid:
              * type: integer
              * description: The unique identifier of the updater
            * updatercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the updater
            * updaterupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the updater
            * updaterdonetime:
              * type: string
              * format: date
              * description: The completion date of the updater
        * createruserid:
          * type: object
          * description: The user who created the computer sealing
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
            * userroleid:
              * type: integer
              * description: The role ID of the user
            * last_login:
              * type: string
              * format: date-time
              * description: The last login time of the user
        * updateruserid:
          * type: object
          * description: The user who last updated the computer sealing
          * properties:
            * userpersonalid:
              * type: integer
              * description: The personal ID of the user
            * username:
              * type: string
              * description: The username of the user
            * userlastname:
              * type: string
              * description: The last name of the user
            * userphonenumber:
              * type: string
              * description: The phone number of the user
            * userlandlinephonenumber:
              * type: string
              * description: The landline phone number of the user
            * usercreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the user
            * userupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the user
        * internalrepairid:
          * type: object
          * description: The internal repair details
          * properties:
            * internalrepairid:
              * type: integer
              * description: The unique identifier of the internal repair
            * internalrepairdescription:
              * type: string
              * description: The description of the internal repair
            * internalrepairchangingdescription:
              * type: string
              * description: The changing description of the internal repair
            * internalrepaircreatetime:
              * type: string
              * format: date-time
              * description: The creation time of the internal repair
            * internalrepairupdatetime:
              * type: string
              * format: date-time
              * description: The last update time of the internal repair
            * internalrepairdonetime:
              * type: string
              * format: date
              * description: The completion date of the internal repair
* ___
##  Create, Detail, Update, Destroy ReplacementDeliveredGoodsInUpdate Api

paths:
  * /replacement-delivered-goods-in-update/{deliveredgoodsid}/{updaterid}/:
    * get:
      * summary: Retrieve replacement delivered goods in update details
      * description: >
        * Allows authenticated admin users to retrieve details of replacement delivered goods in a specific update by its delivered goods ID and updater ID.
      * tags:
        * Replacement Delivered Goods
      * security:
        * bearerAuth: []
      * parameters:
        * name: deliveredgoodsid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the delivered goods to retrieve
        * name: updaterid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the updater to retrieve
      * responses:
        * '200':
          * description: Replacement delivered goods in update details successfully retrieved
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ReplacementDeliveredGoodsInUpdate'
        * '400':
          * description: Bad Request Invalid delivered goods or updater ID
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Delivered goods or updater with the specified ID does not exist
        * '500':
          * description: Internal server error

    * post:
      * summary: Create replacement delivered goods in update
      * description: >
        * Allows authenticated admin users to create a record of replacement delivered goods in a specific update by its delivered goods ID and updater ID.
      * tags:
        * Replacement Delivered Goods
      * security:
        * bearerAuth: []
      * parameters:
        * name: deliveredgoodsid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the delivered goods to create
        * name: updaterid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the updater to create
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ReplacementDeliveredGoodsInUpdate'
      * responses:
        * '200':
          * description: Replacement delivered goods in update successfully created
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ReplacementDeliveredGoodsInUpdate'
        * '400':
          * description: Bad Request Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '500':
          * description: Internal server error

    * put:
      * summary: Update replacement delivered goods in update
      * description: >
        * Allows authenticated admin users to update a record of replacement delivered goods in a specific update by its delivered goods ID and updater ID.
      * tags:
        * Replacement Delivered Goods
      * security:
        * bearerAuth: []
      * parameters:
        * name: deliveredgoodsid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the delivered goods to update
        * name: updaterid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the updater to update
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ReplacementDeliveredGoodsInUpdate'
      * responses:
        * '200':
          * description: Replacement delivered goods in update successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ReplacementDeliveredGoodsInUpdate'
        * '400':
          * description: Bad Request Invalid request data
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Delivered goods or updater with the specified ID does not exist
        * '500':
          * description: Internal server error

    * delete:
      * summary: Delete replacement delivered goods in update
      * description: >
        * Allows authenticated admin users to delete a record of replacement delivered goods in a specific update by its delivered goods ID and updater ID.
      * tags:
        * Replacement Delivered Goods
      * security:
        * bearerAuth: []
      * parameters:
        * name: deliveredgoodsid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the delivered goods to delete
        * name: updaterid
          * in: path
          * required: true
          * schema:
            * type: integer
          * description: The ID of the updater to delete
      * responses:
        * '204':
          * description: Replacement delivered goods in update successfully deleted
        * '400':
          * description: Bad Request Invalid delivered goods or updater ID
        * '401':
          * description: Unauthorized Authentication is required
        * '404':
          * description: Not Found Delivered goods or updater with the specified ID does not exist
        * '500':
          * description: Internal server error

components:
  * schemas:
    * ReplacementDeliveredGoodsInUpdate:
      * type: object
      * properties:
        * updaterid:
          * type: integer
          * description: The unique identifier of the updater
        * deliveredgoodsid:
          * type: integer
          * description: The unique identifier of the delivered goods
        * replacementdescription:
          * type: string
          * description: The description of the replacement

* ___
## Update, Destroy SupersededDeliveredGoodsInUpdate Api

paths:

  * /superseded-delivered-goods/{deliveredgoodsid}/{updaterid}/:
    * put:
      * summary: Update a delivered good with a new updater
      * description: Updates the details of a delivered good with a new updater. Only accessible by admin users.
      * tags:
        * Delivered Goods
      * parameters:
        * name: deliveredgoodsid
          * in: path
          * required: true
          * schema:
            * type: integer
        * name: updaterid
          * in: path
          * required: true
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: Delivered good updated successfully
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/DeliveredGoods'
        * '400':
          * description: Bad request
        * '404':
          * description: Not found
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []
    * patch:
      * summary: Partially update a delivered good with a new updater
      * description: Partially updates the details of a delivered good with a new updater. Only accessible by admin users.
      * tags:
        * Delivered Goods
      * parameters:
        * name: deliveredgoodsid
          * in: path
          * required: true
          * schema:
            * type: integer
        * name: updaterid
          * in: path
          * required: true
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: Delivered good updated successfully
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/DeliveredGoods'
        * '400':
          * description: Bad request
        * '404':
          * description: Not found
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []
    * delete:
      * summary: Delete a delivered good
      * description: Deletes a delivered good. Only accessible by admin users.
      * tags:
        * Delivered Goods
      * parameters:
        * name: deliveredgoodsid
          * in: path
          * required: true
          * schema:
            * type: integer
        * name: updaterid
          * in: path
          * required: true
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: Delivered good deleted successfully
        * '404':
          * description: Not found
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []

components:

  * schemas:
    * DeliveredGoods:
      * type: object
      * properties:
        * deliveredgoodsid:
          * type: integer
          * readOnly: true
        * deliveredgoodsserial:
          * type: string
        * deliveredgoodscreatetime:
          * type: string
          * format: date-time
          * readOnly: true
        * deliveredgoodsupdatetime:
          * type: string
          * format: date-time
          * readOnly: true
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * owneruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updaterid:
          * type: object
          * readOnly: true
          * properties:
            * updaterid:
              * type: integer
            * updatercreatetime:
              * type: string
              * format: date-time
            * updaterupdatetime:
              * type: string
              * format: date-time
            * updaterdonetime:
              * type: string
              * format: date-time
        * goodsid:
          * type: object
          * properties:
            * goodsid:
              * type: integer
            * goodsname:
              * type: string
            * goodsdescription:
              * type: string
        * areaid:
          * type: object
          * properties:
            * areaid:
              * type: integer
            * areaname:
              * type: string
            * areacreatetime:
              * type: string
              * format: date-time
            * areaupdatetime:
              * type: string
              * format: date-time
        * buildingid:
          * type: object
          * properties:
            * buildingid:
              * type: integer
            * buildingname:
              * type: string
            * buildingabbrivationname:
              * type: string
            * buildingcreatetime:
              * type: string
              * format: date-time
            * buildingupdatetime:
              * type: string
              * format: date-time
            * buildingfloorcount:
              * type: integer
            * buildingroomcount:
              * type: integer
        * isAbortion:
          * type: boolean
        * GoodsId:
          * type: integer
          * writeOnly: true
* ___
## List, Create Exchanging Api

paths:

  * /exchanging/:
    * get:
      * summary: Retrieve a list of exchanging records
      * description: Returns a list of exchanging records. Only accessible by admin users.
      * tags:
        * Exchanging
      * responses:
        * '200':
          * description: A list of exchanging records
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/Exchanging'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []
    * post:
      * summary: Create a new exchanging record
      * description: Creates a new exchanging record. Only accessible by admin or supporter users.
      * tags:
        * Exchanging
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/Exchanging'
      * responses:
        * '200':
          * description: Exchanging record created successfully
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Exchanging'
        * '400':
          * description: Bad request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []

components:

  * schemas:
    * Exchanging:
      * type: object
      * properties:
        * exchangingid:
          * type: integer
          * readOnly: true
        * exchangingdescription:
          * type: string
        * exchangingupdatetime:
          * type: string
          * format: date-time
          * readOnly: true
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * RecieverUserId:
          * type: integer
          * readOnly: true
        * ticketid:
          * type: object
          * readOnly: true
          * properties:
            * ticketid:
              * type: integer
            * ticketdescription:
              * type: string
        * TicketId:
          * type: integer
          * writeOnly: true
          * required: false
        * DeliveredGoodsiId:
          * type: integer
          * writeOnly: true
          * required: false
        * ComputerPropertyNumber:
          * type: integer
          * writeOnly: true
          * required: false
        * donetime:
          * type: string
          * format: date
          * writeOnly: true
        * userexchangerid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * areaId:
          * type: integer
          * writeOnly: true
        * buildingId:
          * type: integer
          * writeOnly: true
* ___
## Detail, Update, Destroy Exchanging Api

paths:

  * /exchanging/{pk}/:
    * get:
      * summary: Retrieve details of an exchanging record
      * description: Returns the details of a specific exchanging record. Only accessible by admin or supporter users.
      * tags:
        * Exchanging
      * parameters:
        * name: pk
          * in: path
          * required: true
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: Exchanging record retrieved successfully
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/Exchanging'
        * '400':
          * description: Bad request
        * '404':
          * description: Not found
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []
    * put:
      * summary: Update an exchanging record
      * description: Updates the details of a specific exchanging record. Only accessible by admin or supporter users.
      * tags:
        * Exchanging
      * parameters:
        * name: pk
          * in: path
          * required: true
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ExchangingEdit'
      * responses:
        * '200':
          * description: Exchanging record updated successfully
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ExchangingEdit'
        * '400':
          * description: Bad request
        * '404':
          * description: Not found
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []
    * patch:
      * summary: Partially update an exchanging record
      * description: Partially updates the details of a specific exchanging record. Only accessible by admin or supporter users.
      * tags:
        * Exchanging
      * parameters:
        * name: pk
          * in: path
          * required: true
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ExchangingEdit'
      * responses:
        * '200':
          * description: Exchanging record updated successfully
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ExchangingEdit'
        * '400':
          * description: Bad request
        * '404':
          * description: Not found
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []
    * delete:
      * summary: Delete an exchanging record
      * description: Deletes a specific exchanging record. Only accessible by admin or supporter users.
      * tags:
        * Exchanging
      * parameters:
        * name: pk
          * in: path
          * required: true
          * schema:
            * type: integer
      * responses:
        * '204':
          * description: Exchanging record deleted successfully
        * '400':
          * description: Bad request
        * '404':
          * description: Not found
        * '500':
          * description: Internal server error
      * security:
        * apiKeyAuth: []

components:

  * schemas:
    * Exchanging:
      * type: object
      * properties:
        * exchangingid:
          * type: integer
          * readOnly: true
        * exchangingdescription:
          * type: string
        * exchangingupdatetime:
          * type: string
          * format: date-time
          * readOnly: true
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * RecieverUserId:
          * type: integer
          * readOnly: true
        * ticketid:
          * type: object
          * readOnly: true
          * properties:
            * ticketid:
              * type: integer
            * ticketdescription:
              * type: string
        * TicketId:
          * type: integer
          * writeOnly: true
          * required: false
        * DeliveredGoodsiId:
          * type: integer
          * writeOnly: true
          * required: false
        * ComputerPropertyNumber:
          * type: integer
          * writeOnly: true
          * required: false
        * donetime:
          * type: string
          * format: date
          * writeOnly: true
        * userexchangerid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * areaId:
          * type: integer
          * writeOnly: true
        * buildingId:
          * type: integer
          * writeOnly: true

    * ExchangingEdit:
      * type: object
      * properties:
        * exchangingid:
          * type: integer
          * readOnly: true
        * exchangingdescription:
          * type: string
        * exchangingupdatetime:
          * type: string
          * format: date-time
          * readOnly: true
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * updateruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
        * ticketid:
          * type: object
          * readOnly: true
          * properties:
            * ticketid:
              * type: integer
            * ticketdescription:
              * type: string
        * donetime:
          * type: string
          * format: date
          * writeOnly: true
        * userexchangerid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * usercreatetime:
              * type: string
              * format: date-time
            * userupdatetime:
              * type: string
              * format: date-time
            * userroleid:
              * type: integer
            * last_login:
              * type: string
              * format: date-time
