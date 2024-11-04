# Account App API's:

## Login API
paths:

  * /accounts/login/:

    * method post:
    
      * summary: User login
      * description: Authenticates a user and returns access and refresh tokens.
      * tags: Authentication
      
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * type: object
              * properties:
                * userpersonalid:
                  * type: integer
                  * description: The personal ID of the user.
                * userpasword:
                  * type: string
                  * description: The password of the user.
                  * format: password
              * required:
                * userpersonalid
                * userpasword

      * responses:
        * '200':
          * description: Successful login
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * userid:
                    * type: integer
                    * description: The ID of the user.
                  * userpersonalid:
                    * type: integer
                    * description: The personal ID of the user.
                  * tokens:
                    * type: object
                    * properties:
                      * refresh:
                        * type: string
                        * description: The refresh token.
                      * access:
                        * type: string
                        * description: The access token.
        * '400':
          * content:
              * application/json:
                * schema:
                  * type: object
                  * properties:
                    * userpersonalid:
                      * type: list
                      * description: this value is required.
                    * userpasword:
                      * type: list
                      * description: this value is required.
            * '401':
              * content:
                * application/json:
                  * schema:
                    * type: object
                    * properties:
                      * detail:
                        * type: string
                        * description: invalid credentials, try again
            * '500':
              * description: Internal server error
      * security:
        * bearerAuth: []
        
components:
        
  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT
___
## Logout API

paths:

  * /accounts/logout/:
    * method post:
      * summary: User logout
      * description: Logs out a user by blacklisting the provided refresh token.
      * tags:
        * Authentication
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * type: object
              * properties:
                * refresh:
                  * type: string
                  * description: The refresh token to be blacklisted.
              * required:
                * refresh
      * responses:
        * '204':
          * description: Successful logout, no content
        * '400':
            * content:
              * application/json:
                * schema:
                  * type: object
                  * properties:
                    * refresh
                      * type: array
                      * items
                        * type: string
                        * description: Error message indicating that the refresh token is required
                    * description: List of error messages related to the refresh token
        * '401':
            * content:
              * application/json:
                * schema:
                  * type: object
                  * properties:
                    * detail:
                      * type: string
                      * description: Authentication credentials were not provided.
                  * properties:
                    * detail:
                      * type: string
                      * description: Given token not valid for any token type
                    * code:
                      * type: string
                      * description: token_not_valid
                    * message:
                      * type: array
                      * items:
                        * type: object
                        * properties:
                          * token_class:
                            * type: string
                            * description: Class of the token
                          * token_type
                            * type: string
                            * description: Type of the token
                          * message:
                            * type: string
                            * description: Detailed message about the token error
        * '415': 
          * content:
             * application/json:
               * schema:
                 * type: object
                 * properties:
                   * detail:
                     * type: string
                     * description: Detailed error message indicating the unsupported media type
        * '500':
          * description: Internal server error
      * security:
        * bearerAuth: []
        
components:

  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT
___
## ChangePassword API

paths:

  * /accounts/change/password/:
    * method put:
      * summary: Change user password
      * description: Allows an authenticated user to change their password.
      * tags:
        * Authentication
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * type: object
              * properties:
                * old_password:
                  * type: string
                  * description: The current password of the user. length of it must be at least 8 and at most 128.
                * new_password:
                  * type: string
                  * description: The new password for the user. length of it must be at least 8 and at most 128.
                * repeated_new_password:
                  * type: string
                  * description: The new password repeated for confirmation. length of it must be at least 8 and at most 128.
              * required:
                * old_password
                * new_password
                * repeated_new_password
      * responses:
        * '200':
          * description: Password update successful
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * message:
                    * type: string
                    * example: password update successful
        * '400':
          * description: Invalid inputs causes
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * old_password
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the old password field is required
                    * description: List of error messages related to the old password field
                  * new_password
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the new password field is required
                    * description: List of error messages related to the new password field                  
                  * repeated_new_password
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the repeated new password field is required
                    * description: List of error messages related to the repeated new password field
                * properties:
                  * old_password
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the old password field must have at least 8 characters
                    * description: List of error messages related to the old password field
                  * new_password
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the new password field must have at least 8 characters
                    * description: List of error messages related to the new password field                  
                  * repeated_new_password
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the repeated new password field must have at least 8 characters
                    * description: List of error messages related to the repeated new password field
                * properties:
                  * old_password
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the old password field must have at most 128 characters
                    * description: List of error messages related to the old password field
                  * new_password
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the new password field must have at most 128 characters
                    * description: List of error messages related to the new password field                  
                  * repeated_new_password
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the repeated new password field must have at most 128 characters
                    * description: List of error messages related to the repeated new password field
                * properties:
                  * non_field_errors
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the entered password is incorrect
                    * description: List of non-field error messages                    
                * properties:
                  * non_field_errors
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the password and repeated password must be the same
                    * description: List of non-field error messages
        * '401':
            * content:
              * application/json:
                * schema:
                  * type: object
                  * properties:
                    * detail:
                      * type: string
                      * description: Authentication credentials were not provided.
                  * properties:
                    * detail:
                      * type: string
                      * description: Given token not valid for any token type
                    * code:
                      * type: string
                      * description: token_not_valid
                    * message:
                      * type: array
                      * items:
                        * type: object
                        * properties:
                          * token_class:
                            * type: string
                            * description: Class of the token
                          * token_type
                            * type: string
                            * description: Type of the token
                          * message:
                            * type: string
                            * description: Detailed message about the token error
        * '500':
          * description: Internal server error
      * security:
        * bearerAuth: []
        
components:

  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT
---
## WorkingLoaction Dreate, Update, Delete, Detail API

paths:

  * /accounts/user/working/locations/:
    * method post:
      * summary: Determine the working place of a user
      * description: This endpoint allows an admin or supporter to determine and set the working place of a user.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/WorkingLocation'
      * responses:
        * '201':
          * description: Working place successfully determined
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/WorkingLocation'
        * '400':
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * userpersonalid
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the user personal id field is required
                    * description: List of error messages related to the user personal id field                                
                  * roomnumber
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the room number field is required
                    * description: List of error messages related to the room number field                
                  * userpersonalid
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the user personal id field is required
                    * description: List of error messages related to the user personal id field                
                  * areaId
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the area id field is required
                    * description: List of error messages related to the area id field                
                  * buildingId
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the building id field is required
                    * description: List of error messages related to the building id field                
                  * userofficial
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the user official field is required
                    * description: List of error messages related to the user official field
                * properties:
                  * userofficial
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the user official field must have at most 255 characters
                    * description: List of error messages related to the user official fiel
                * properties:
                  * non_field_errors
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that entered area id not exist in the database
                    * description: List of non-field error messages
                * properties:
                  * non_field_errors
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that entered room number bigger than the rooms count or equal to 0
                    * description: List of non-field error message
                * properties:
                  * non_field_errors
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that supporter user just can add user to you area and building
                    * description: List of non-field error messages
        * '401':
            * content:
              * application/json:
                * schema:
                  * type: object
                  * properties:
                    * detail:
                      * type: string
                      * description: Authentication credentials were not provided.
                  * properties:
                    * detail:
                      * type: string
                      * description: Given token not valid for any token type
                    * code:
                      * type: string
                      * description: token_not_valid
                    * message:
                      * type: array
                      * items:
                        * type: object
                        * properties:
                          * token_class:
                            * type: string
                            * description: Class of the token
                          * token_type
                            * type: string
                            * description: Type of the token
                          * message:
                            * type: string
                            * description: Detailed message about the token error
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Working Locations
      * security:
        * bearerAuth: []
    * method put:
      * summary: Update user's working place
      * description: This endpoint allows an admin or supporter to update the working place of a user.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/UpdateWorkingLocation'
      * responses:
        * '200':
          * description: Working place successfully updated
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/UpdateWorkingLocation'
        * '400':
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * non_field_errors
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that supporter user just can add user to you area and building
                    * description: List of non-field error messages     
                * properties:
                  * userpersonalid
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the user personal id field is required
                    * description: List of error messages related to the user personal id field
                * properties:
                  * userofficial
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the user official field must have at most 255 characters
                    * description: List of error messages related to the user official fiel
        * '401':
            * content:
              * application/json:
                * schema:
                  * type: object
                  * properties:
                    * detail:
                      * type: string
                      * description: Authentication credentials were not provided.
                  * properties:
                    * detail:
                      * type: string
                      * description: Given token not valid for any token type
                    * code:
                      * type: string
                      * description: token_not_valid
                    * message:
                      * type: array
                      * items:
                        * type: object
                        * properties:
                          * token_class:
                            * type: string
                            * description: Class of the token
                          * token_type
                            * type: string
                            * description: Type of the token
                          * message:
                            * type: string
                            * description: Detailed message about the token error
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Working Locations
      * security:
        * bearerAuth: []
    * method delete:
      * summary: Delete user's working place
      * description: This endpoint allows an admin or supporter to delete the working place of a user by user ID, area ID, and building ID.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/DeleteWorkingLocation'
      * responses:
        * '204':
          * description: Working place successfully deleted
        * '400':
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * userpersonalid
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the user personal id field is required
                    * description: List of error messages related to the user personal id field
                  * areaId
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the area id field is required
                    * description: List of error messages related to the area id field                
                  * buildingId
                    * type: array
                    * items
                      * type: string
                      * description: Error message indicating that the building id field is required
                    * description: List of error messages related to the building id field
        * '401':
            * content:
              * application/json:
                * schema:
                  * type: object
                  * properties:
                    * detail:
                      * type: string
                      * description: Authentication credentials were not provided.
                  * properties:
                    * detail:
                      * type: string
                      * description: Given token not valid for any token type
                    * code:
                      * type: string
                      * description: token_not_valid
                    * message:
                      * type: array
                      * items:
                        * type: object
                        * properties:
                          * token_class:
                            * type: string
                            * description: Class of the token
                          * token_type
                            * type: string
                            * description: Type of the token
                          * message:
                            * type: string
                            * description: Detailed message about the token error
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Working Locations
      * security:
        * bearerAuth: []
    * method get:
      * summary: Retrieve sub-user's working location details
      * description: This endpoint allows an admin or supporter to retrieve the working location details of a sub-user by their user ID.
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The ID of the sub-user
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: Working location details retrieved successfully
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/DetailWorkingLocation'
        * '401':
            * content:
              * application/json:
                * schema:
                  * type: object
                  * properties:
                    * detail:
                      * type: string
                      * description: Authentication credentials were not provided.
                  * properties:
                    * detail:
                      * type: string
                      * description: Given token not valid for any token type
                    * code:
                      * type: string
                      * description: token_not_valid
                    * message:
                      * type: array
                      * items:
                        * type: object
                        * properties:
                          * token_class:
                            * type: string
                            * description: Class of the token
                          * token_type
                            * type: string
                            * description: Type of the token
                          * message:
                            * type: string
                            * description: Detailed message about the token error
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Working Locations
      * security:
        * bearerAuth: []

        
components:

  * schemas:
    * WorkingLocation:
      * type: object
      * properties:
        * userpersonalid:
          * type: integer
          * example: 12345
        * areaId:
          * type: integer
          * example: 1
        * buildingId:
          * type: integer
          * example: 10
        * userofficial:
          * type: string
          * example: "John Doe"
        * roomnumber:
          * type: integer
          * example: 101
    * DetailWorkingLocation:
      * type: object
      * properties:
        * buildingid:
          * type: integer
          * example: 10
        * userid:
          * type: integer
          * example: 12345
        * areaid:
          * type: integer
          * example: 1
        * userofficial:
          * type: string
          * example: "John Doe"
        * roomnumber:
          * type: integer
          * example: 101
    * DeleteWorkingLocation:
      * type: object
      * properties:
        * userpersonalid:
          * type: integer
          * example: 12345
        * areaId:
          * type: integer
          * example: 1
        * buildingId:
          * type: integer
          * example: 10
    * UpdateWorkingLocation:
      * type: object
      * properties:
        * userpersonalid:
          * type: integer
          * example: 12345
        * areaId:
          * type: integer
          * example: 1
        * buildingId:
          * type: integer
          * example: 10
        * userofficial:
          * type: string
          * example: "John Doe"
        * roomnumber:
          * type: integer
          * example: 101

  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT
___
## SubUserWithWorkingPlaceList API

paths:

   * /accounts/user/list/:
     * method get:
       * summary: Retrieve a list of sub-users with their working places
       * description: This endpoint allows an admin or supporter to retrieve a list of all sub-users along with their working places.
       * responses:
         * '200':
           * description: List of sub-users retrieved successfully
           * content:
             * application/json:
               * schema:
                 * type: array
                 * items:
                   * $ref: '#/components/schemas/SubUserWithWorkingPlace'
        * '401':
            * content:
              * application/json:
                * schema:
                  * type: object
                  * properties:
                    * detail:
                      * type: string
                      * description: Authentication credentials were not provided.
                  * properties:
                    * detail:
                      * type: string
                      * description: Given token not valid for any token type
                    * code:
                      * type: string
                      * description: token_not_valid
                    * message:
                      * type: array
                      * items:
                        * type: object
                        * properties:
                          * token_class:
                            * type: string
                            * description: Class of the token
                          * token_type
                            * type: string
                            * description: Type of the token
                          * message:
                            * type: string
                            * description: Detailed message about the token error
         * '403':
           * description: Permission denied
         * '500':
           * description: Internal server error
       * tags:
         * Users
       * security:
         * bearerAuth: []
        
components:

  * schemas:
    * SubUserWithWorkingPlace:
      * type: object
      * properties:
        * userid:
          * type: integer
          * example: 12345
        * userpersonalid:
          * type: integer
          * example: 67890
        * username:
          * type: string
          * example: "John"
        * userlastname:
          * type: string
          * example: "Doe"
        * userphonenumber:
          * type: string
          * example: "+1234567890"
        * userlandlinephonenumber:
          * type: string
          * example: "+0987654321"
        * userroleid:
          * type: integer
          * example: 3
        * is_active:
          * type: boolean
          * example: true
        * buildingname:
          * type: string
          * example: "Main Building"
        * areaname:
          * type: string
          * example: "Area 1"
        * userofficial:
          * type: string
          * example: "Official Title"
        * roomnumber:
          * type: integer
          * example: 101
  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT

___
## ChangeSubUserPassword API

paths:

  * /accounts/change/subuser/password/:
    * method put:
      * summary: Change sub-user's password
      * description: This endpoint allows an admin or supporter to change the password of a sub-user.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ChangeSubUserPassword'
      * responses:
        * '200':
          * description: Password update successful
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * message:
                    * type: string
                    * example: "password update successful"
        * '400':
          * description: Invalid request
        * '401':
            * content:
              * application/json:
                * schema:
                  * type: object
                  * properties:
                    * detail:
                      * type: string
                      * description: Authentication credentials were not provided.
                  * properties:
                    * detail:
                      * type: string
                      * description: Given token not valid for any token type
                    * code:
                      * type: string
                      * description: token_not_valid
                    * message:
                      * type: array
                      * items:
                        * type: object
                        * properties:
                          * token_class:
                            * type: string
                            * description: Class of the token
                          * token_type
                            * type: string
                            * description: Type of the token
                          * message:
                            * type: string
                            * description: Detailed message about the token error
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Users
      * security:
        * bearerAuth: []
        
components:

  * schemas:
    * ChangeSubUserPassword:
      * type: object
      * properties:
        * userpersonalid:
          * type: integer
          * example: 12345
        * new_password:
          * type: string
          * example: "newpassword123"
  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT

___
## ChangeSubUserProfile API

paths:

  * /accounts/change/subuser/profile/:
    * method put:
      * summary: Change sub-user's profile
      * description: This endpoint allows an admin or supporter to change the profile information of a sub-user.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ChangeSubUserProfile'
      * responses:
        * '200':
          * description: Profile update successful
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * message:
                    * type: string
                    * example: "profile update successful"
        * '400':
          * description: Invalid request
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Users
      * security:
        * bearerAuth: []
        
components:

  * schemas:
    * ChangeSubUserProfile:
      * type: object
      * properties:
        * userpersonalid:
          * type: integer
          * example: 12345
        * username:
          * type: string
          * example: "John"
        * userlastname:
          * type: string
          * example: "Doe"
        * userphonenumber:
          * type: string
          * example: "+1234567890"
        * userlandlinephonenumber:
          * type: string
          * example: "+0987654321"
  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT

___
## ChooseTheSupporter API

paths:

  * /accounts/supporter/:
    * method post:
      * summary: Select a supporter user for each floor of a building
      * description: This endpoint allows an admin to select one supporter user for each floor of a building.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ChooseTheSupporter'
      * responses:
        * '201':
          * description: Supporter user selected successfully
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/ChooseTheSupporter'
        * '400':
          * description: Invalid request
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Supporters
      * security:
        * bearerAuth: []
    * method put:
      * summary: Update supporter user for each floor of a building
      * description: This endpoint allows an admin to update the supporter user for each floor of a building.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/UpdateSupporterInfo'
      * responses:
        * '200':
          * description: Supporter user updated successfully
          * content:
            * application/json:
              * schema:
                * $ref: '#/components/schemas/UpdateSupporterInfo'
        * '400':
          * description: Invalid request
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Supporters
      * security:
        * bearerAuth: []
    * method delete:
      * summary: Delete supporter user for each floor of a building
      * description: This endpoint allows an admin to delete the supporter user for each floor of a building.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/DeleteSupporter'
      * responses:
        * '204':
          * description: Supporter user deleted successfully
        * '400':
          * description: Invalid request
        * '403':
          description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Supporters
      * security:
        * bearerAuth: []
    * method get:
      * summary: Retrieve a list of supporters
      * description: This endpoint allows an admin to retrieve a list of all supporters along with their assigned floors and buildings.
      * responses:
        * '200':
          * description: List of supporters retrieved successfully
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/Supporter'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Supporters
      * security:
        * bearerAuth: []
        
components:

  * schemas:
    * ChooseTheSupporter:
      * type: object
      * properties:
        * userpersonalid:
          * type: integer
          * example: 12345
        * buildingid:
          * type: integer
          * example: 10
        * floor:
          * type: integer
          * example: 2
    * UpdateSupporterInfo:
      * type: object
      * properties:
        * old_supporterpersonalId:
          * type: integer
          * example: 12345
        * new_supporterpersobalId:
          * type: integer
          * example: 67890
        * buildingid:
          * type: integer
          * example: 10
        * floor:
          * type: integer
          * example: 2
    * DeleteSupporter:
      * type: object
      * properties:
        * userpersonalid:
          * type: integer
          * example: 12345
        * buildingid:
          * type: integer
          * example: 10
        * floor:
          * type: integer
          * example: 2
    * Supporter:
      * type: object
      * properties:
        * userid:
          * type: integer
          * example: 12345
        * username:
          * type: string
          * example: "John"
        * userlastname:
          * type: string
          * example: "Doe"
        * userphonenumber:
          * type: string
          * example: "+1234567890"
        * userlandlinephonenumber:
          * type: string
          * example: "+0987654321"
        * userpersonalid:
          * type: integer
          * example: 67890
        * availablefloor:
          * type: integer
          * example: 2
        * buildingname:
          * type: string
          * example: "Main Building"
  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT
---
## Create, List, Deactivate, Activate User API

paths:
  
  * /accounts/user/:
    * method post:
      * summary: Create a new user
      * description: Allows an admin or supporter to create a new user.
      * tags:
        * User Management
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * type: object
              * properties:
                * userpersonalid:
                  * type: integer
                  * description: The personal ID of the user.
                * username:
                  * type: string
                  * description: The first name of the user.
                * userlastname:
                  * type: string
                  * description: The last name of the user.
                * userphonenumber:
                  * type: string
                  * description: The phone number of the user.
                * userlandlinephonenumber:
                  * type: string
                  * description: The landline phone number of the user.
                  * required: false
                * userroleid:
                  * type: integer
                  * description: The role ID of the user (2 for supporter, 3 for usual user).
                * supporterid:
                  * type: integer
                  * description: The ID of the supporter.
                  * required: false
              * required:
                * userpersonalid
                * username
                * userlastname
                * userphonenumber
                * userroleid
      * responses:
        * '201':
          * description: User created successfully
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * userid:
                    * type: integer
                    * description: The ID of the user.
                  * userpersonalid:
                    * type: integer
                    * description: The personal ID of the user.
                  * username:
                    * type: string
                    * description: The first name of the user.
                  * userlastname:
                    * type: string
                    * description: The last name of the user.
                  * userphonenumber:
                    * type: string
                    * description: The phone number of the user.
                  * userlandlinephonenumber:
                    * type: string
                    * description: The landline phone number of the user.
                  * userroleid:
                    * type: integer
                    * description: The role ID of the user.
                  * supporterid:
                    * type: integer
                    * description: The ID of the supporter.
        * '400':
          * description: Invalid input
        * '401':
          * description: Unauthorized        
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
      * security:
        * bearerAuth: []
    * method get:
       * summary: Retrieve a list of sub-users with their working places
       * description: This endpoint allows an admin or supporter to retrieve a list of all sub-users along with their working places.
       * responses:
         * '200':
           * description: List of sub-users retrieved successfully
           * content:
             * application/json:
               * schema:
                 * type: array
                 * items:
                   * $ref: '#/components/schemas/SubUserWithWorkingPlace'
         * '401':
           * description: Unauthorized
         * '403':
           * description: Permission denied
         * '500':
           * description: Internal server error
       * tags:
         * Users
       * security:
         * bearerAuth: []
    * method delete:
      * summary: Deactivate a user
      * description: This endpoint allows an admin to deactivate a user.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/DeactivateUser'
      * responses:
        * '200':
          * description: User deactivated successfully
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * message:
                    * type: string
                    * example: "user deactivated"
        * '400':
          * description: Invalid request
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Users
      * security:
        * bearerAuth: []
    * method put:
      * summary: Activate a user
      * description: This endpoint allows an admin to activate a user.
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * $ref: '#/components/schemas/ActivateUser'
      * responses:
        * '200':
          * description: User activated successfully
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * message:
                    * type: string
                    * example: "user activated"
        * '400':
          * description: Invalid request
        * '403':
          * description: Permission denied
        * '500':
          * description: Internal server error
      * tags:
        * Users
      * security:
        * bearerAuth: []
        
components:

  * securitySchemes:
    * bearerAuth:
      * type: http
        * scheme: 
            * bearer
            * SubUserWithWorkingPlace:
              * type: object
              * properties:
                * userid:
                  * type: integer
                  * example: 12345
                * userpersonalid:
                  * type: integer
                  * example: 67890
                * username:
                  * type: string
                  * example: "John"
                * userlastname:
                  * type: string
                  * example: "Doe"
                * userphonenumber:
                  * type: string
                  * example: "+1234567890"
                * userlandlinephonenumber:
                  * type: string
                  * example: "+0987654321"
                * userroleid:
                  * type: integer
                  * example: 3
                * is_active:
                  * type: boolean
                  * example: true
                * buildingname:
                  * type: string
                  * example: "Main Building"
                * areaname:
                  * type: string
                  * example: "Area 1"
                * userofficial:
                  * type: string
                  * example: "Official Title"
                * roomnumber:
                  * type: integer
                    * example: 101
          
              * bearerFormat: JWT
            * DeactivateUser:
              * type: object
              * properties:
                * userpersonalid:
                  * type: integer
                  * example: 12345
            * ActivateUser:
              * type: object
              * properties:
                * userpersonalid:
                  * type: integer
                  * example: 12345
## Create And List Of Area API

paths:

  * /area/:
    * method post:
      * summary: Create a new area
      * description: Allows an admin to create a new area in the database.
      * tags:
        * Area Management
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * type: object
              * properties:
                * areaname:
                  * type: string
                  * description: The name of the area.
                  * minLength: 4
              * required:
                * areaname
      * responses:
        * '201':
          * description: Area created successfully
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * areaname:
                    * type: string
                    * description: The name of the area.
        * '400':
          * description: Invalid input
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
      * security:
        * bearerAuth: []
    * method get:
      * summary: List all areas
      * description: Retrieves a list of all areas in the database. Only accessible by admins.
      * tags:
        * Area Management
      * responses:
        * '200':
          * description: Successful retrieval of area list
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * type: object
                  * properties:
                    * id:
                      * type: integer
                      * description: The ID of the area.
                    * areaname:
                      * type: string
                      * description: The name of the area.
                    * createruserid:
                      * type: integer
                      * description: The ID of the user who created the area.
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
      * security:
        * bearerAuth: [] 
components:

  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT
___
## Detail, Update, Delete Area API

paths:

* /area/{pk}/:
  * method get:
    * summary: Retrieve area details
    * description: Retrieves detailed information about a specific area. Only accessible by authenticated users.
    * tags:
      * Area Management
    * parameters:
      * name: pk
        * in: path
        * required: true
        * description: The ID of the area to retrieve.
        * schema:
          * type: integer
    * responses:
      * '200':
        * description: Successful retrieval of area details
        * content:
          * application/json:
            * schema:
              * type: object
              * properties:
                * id:
                  * type: integer
                  * description: The ID of the area.
                * areaname:
                  * type: string
                  * description: The name of the area.
                * createruserid:
                  * type: integer
                  * description: The ID of the user who created the area.
      * '401':
        * description: Unauthorized
      * '404':
        * description: Area not found
      * '500':
        * description: Internal server error
    * security:
      * bearerAuth: []
  * method put:
    * summary: Update an area
    * description: Allows an admin to update the name of an existing area.
    * tags:
      * Area Management
    * parameters:
      * name: pk
        * in: path
        * required: true
        * description: The ID of the area to update.
        * schema:
          * type: integer
    * requestBody:
      * required: true
      * content:
        * application/json:
          * schema:
            * type: object
            * properties:
              * areaname:
                * type: string
                * description: The new name of the area.
                * minLength: 4
            * required:
              * areaname
    * responses:
      * '200':
        * description: Area updated successfully
        * content:
          * application/json:
            * schema:
              * type: object
              * properties:
                * areaname:
                  * type: string
                  * description: The new name of the area.
      * '400':
        * description: Invalid input
      * '401':
        * description: Unauthorized
      * '403':
        * description: Forbidden
      * '404':
        * description: Area not found
      * '500':
        * description: Internal server error
    * security:
      * bearerAuth: []
  * method delete:
    * summary: Delete an area
    * description: Allows an admin to delete an existing area by its ID.
    * tags:
      * Area Management
    * parameters:
      * name: pk
        * in: path
        * required: true
        * description: The ID of the area to delete.
        * schema:
          * type: integer
    * responses:
      * '200':
        * description: Area deleted successfully
        * content:
          * application/json:
            * schema:
              * type: object
              * properties:
                * message:
                  * type: string
                  * example: you successfully deleted the area with area id {pk}
      * '400':
        * description: Invalid input or area not found
        * content:
          * application/json:
           *  schema:
              * type: object
              * properties:
                * error:
                  * type: string
                  * example: we don't have any area with this id {pk}
      * '401':
        * description: Unauthorized
      * '403':
        * description: Forbidden
      * '500':
        * description: Internal server error
    * security:
      * bearerAuth: []
                
components:

   * securitySchemes:
     * bearerAuth:
       * type: http
       * scheme: bearer
       * bearerFormat: JWT
___
## Create And List Building API

paths:

  * /building/:
    * method post:
      * summary: Create a new building
      * description: Allows an admin to create a new building in the database.
      * tags:
        * Building Management
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * type: object
              * properties:
                * buildingname:
                  * type: string
                  * description: The name of the building.
                  * minLength: 4
                * buildingabbrivationname:
                  * type: string
                  * description: The abbreviation name of the building.
                  * minLength: 2
                * buildingfloorcount:
                  * type: integer
                  * description: The number of floors in the building.
                  * minimum: 1
                * buildingroomcount:
                  * type: integer
                  * description: The number of rooms in the building.
                  * minimum: 1
              * required:
                * buildingname
                * buildingabbrivationname
                * buildingfloorcount
                * buildingroomcount
      * responses:
        * '201':
          * description: Building created successfully
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * buildingname:
                    * type: string
                    * description: The name of the building.
                  * buildingabbrivationname:
                    * type: string
                    * description: The abbreviation name of the building.
                  * buildingfloorcount:
                    * type: integer
                    * description: The number of floors in the building.
                  * buildingroomcount:
                    * type: integer
                    * description: The number of rooms in the building.
        * '400':
          * description: Invalid input
        * '401':
          * description: Unauthorized
        * '500':
          * description: Internal server error
      * security:
        * bearerAuth: []
    * method get:
      * summary: List all buildings
      * description: Retrieves a list of all buildings in the database. Only accessible by admins.
      * tags:
        * Building Management
      * responses:
        * '200':
          * description: Successful retrieval of building list
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * type: object
                  * properties:
                    * id:
                      * type: integer
                      * description: The ID of the building.
                    * buildingname:
                      * type: string
                      * description: The name of the building.
                    * buildingabbrivationname:
                      * type: string
                      * description: The abbreviation name of the building.
                    * buildingfloorcount:
                      * type: integer
                      * description: The number of floors in the building.
                    * buildingroomcount:
                      * type: integer
                      * description: The number of rooms in the building.
                    * createruserid:
                      * type: integer
                      * description: The ID of the user who created the building.
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
      * security:
        * bearerAuth: []
        
components:

  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT

___
## Detail, Delete, Update Building API

paths:

  * /building/{pk}/:
    * method get:
      * summary: Retrieve building details
      * description: Retrieves detailed information about a specific building. Only accessible by authenticated users.
      * tags:
        * Building Management
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The ID of the building to retrieve.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: Successful retrieval of building details
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * id:
                    * type: integer
                    * description: The ID of the building.
                  * buildingname:
                    * type: string
                    * description: The name of the building.
                  * buildingabbrivationname:
                    * type: string
                    * description: The abbreviation name of the building.
                  * buildingfloorcount:
                    * type: integer
                    * description: The number of floors in the building.
                  * buildingroomcount:
                    * type: integer
                    * description: The number of rooms in the building.
                  * createruserid:
                    * type: integer
                    * description: The ID of the user who created the building.
        * '401':
          * description: Unauthorized
        * '404':
          * description: Building not found
        * '500':
          * description: Internal server error
      * security:
        * bearerAuth: []
    * method delete:
      * summary: Delete a building
      * description: Deletes a building with the specified ID. Only accessible by admins.
      * tags:
        * Building Management
      * parameters:
        * name: pk
          * in: path
          * required: true
          * description: The ID of the building to delete.
          * schema:
            * type: integer
      * responses:
        * '200':
          * description: Successful deletion of the building
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * message:
                    * type: string
                    * example: you successfully deleted the building with building id 1
        * '400':
          * description: Bad request
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * error:
                    * type: string
                    * example: we don't have any building with this id 1
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
      * security:
        * bearerAuth: []        
components:
    * method put:
      * summary: Update a building
      * description: Updates the details of a building with the specified ID. Only accessible by admins.
      * tags:
        * Building Management
      * parameters:
          * name: pk
          * in: path
          * required: true
          * description: The ID of the building to update.
          * schema:
            * type: integer
      * requestBody:
        * required: true
        * content:
          * application/json:
            * schema:
              * type: object
              * properties:
                * buildingname:
                  * type: string
                  * description: The name of the building.
                * buildingabbrivationname:
                  * type: string
                  * description: The abbreviation name of the building.
                * buildingfloorcount:
                  * type: integer
                  * description: The number of floors in the building.
                * buildingroomcount:
                  * type: integer
                  * description: The number of rooms in the building.
                * createruserid:
                  * type: integer
                  * description: The ID of the user who created the building.
      * responses:
        * '200':
          * description: Successful update of the building
          * content:
            * application/json:
              * schema:
                * type: object
                * properties:
                  * buildingname:
                    * type: string
                  * buildingabbrivationname:
                    * type: string
                  * buildingfloorcount:
                    * type: integer
                  * buildingroomcount:
                    * type: integer
                  * createruserid:
                    * type: integer
        * '400':
          * description: Bad request
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
      * security:
        * bearerAuth: []
  * securitySchemes:
    * bearerAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT
___
## ListUserRole API

paths:

  * /roles/list/:
    * method get:
      * summary: Retrieve a list of user roles
      * description: Returns a list of user roles based on the user's role. Admins receive supporter and usual user roles, while supporters receive only usual user roles.
      * operationId: listUserRoles
      * tags:
        * Roles
      * security:
        * JWTAuth: []
      * responses:
        * '200':
          * description: A JSON array of user role objects
          * content:
            * application/json:
              * schema:
                * type: array
                * items:
                  * $ref: '#/components/schemas/UserRole'
        * '401':
          * description: Unauthorized
        * '403':
          * description: Forbidden
        * '500':
          * description: Internal server error
        
components:

  * securitySchemes:
    * JWTAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT
  * schemas:
    * UserRole:
      * type: object
      * properties:
        * id:
          * type: integer
          * example: 1
        * name:
          * type: string
          * example: "Supporter"
        * description:
          * type: string
          * example: "A user role for support staff"

___
## 

paths:
  * user/profile/
      * method get:
          * summary: Retrieve user Profile
          * description: Returns user profile. every authenticated user can access this
          * tags:
            * UserProfile
          * security:
            * JWTAuth: []
          * responses:
            * '200':
              * description: A JSON array of user profile
              * content:
                * application/json:
                  * schema:
                    * type: object
                    * items:
                      * $ref: '#/components/schemas/UserProfile'
            * '401':
              * description: Unauthorized
            * '500':
              * description: Internal server error
components:

  * securitySchemes:
    * JWTAuth:
      * type: http
      * scheme: bearer
      * bearerFormat: JWT
  * schemas:
    * GoodsAttributesDefaultValue:
      * type: object
      * properties:
        * createruserid:
          * type: object
          * readOnly: true
          * properties:
            * userpersonalid:
              * type: integer          
            * userid:
              * type: integer
            * username:
              * type: string
            * userlastname:
              * type: string
            * userphonenumber:
              * type: string
            * userlandlinephonenumber:
              * type: string
            * supporterid:
              * type: integer
            * working_detail
              * object
              * properties
                * userofficial
                * roomnumber
                * buildingid
                * buildingname
                * areaid
                * areaname
