# Azure

* Azure, also known as Microsoft Azure, is Microsoft's public cloud computing platform
* It provides a broad range of cloud services, including compute, analytics, storage and networking. 
* Users can pick and choose from these services to develop and scale new applications or run existing applications in the public cloud.

### Azure vs AWS
* One of the main differences between Azure and AWS is the scope of services they offer. Azure has a more extensive range of services that cover a wide range of scenarios, including artificial intelligence, internet of things, and blockchain, while AWS services are more focused on infrastructure, storage, and databases.
* Azure integrates well with other Microsoft services, such as Windows Server and Office 365
* Pricing - Azure is generally considered to be more cost-effective for smaller workloads, while AWS is better suited for larger workloads

<br/>

### Azure Active Directory (AD)

In azure active directory, we can create users, groups, manage roles and admins, etc
(https://entra.microsoft.com/#view/Microsoft_AAD_UsersAndTenants/UserManagementMenuBlade/~/AllUsers/menuId/)

* Azure Active Directory (Azure AD) is Microsoft’s enterprise cloud-based identity and access management (IAM) solution
* For an organization, Azure AD helps employees sign up to multiple services and access them anywhere over the cloud with a single set of login credentials.
* Azure AD is the backbone of the Office 365 system, and it can sync with on-premise Active Directory and provide authentication to other cloud-based systems via OAuth.

### Microsoft Entra ID
* Microsoft Entra ID is a cloud-based identity and access management solution. 
* It is a directory and identity management service that operates in the cloud and offers authentication and authorization services to various Microsoft services, such as Microsoft 365, Dynamics 365, Microsoft Azure and third-party services

### How is Azure Active Directory (AD) and Entra Id related?
Microsoft Entra ID is the new name for Azure AD   
All licensing and functionality remain the same

https://www.youtube.com/watch?v=ZVs9FWjXFMU

<br/>

### Configuring ZScaler application for SSO to Azure AD

Reference video - https://www.youtube.com/watch?v=7SU5S0WtNNk

Note - For our internal app 
* On the portal > Microsoft Entra Id > App registrations 
* All apps will be listed there (our app is called AzureLoginPOC)

Steps

* Log into https://portal.azure.com/ with administrator role
* Azure active directory will be listed as a service (now called Entra Id)
* On the portal > Microsoft Entra Id > Enterprise applications > New application
* Choose ZScaler from the template options, name it as zscaler demo, create. Application will now be added to your tenant
* Inside the zscaler demo application, under manage, click on users and groups, there you can add users and groups
* Next we want to setup SSO, under the zscaler demo application, under manage, click single sign on
* This application supports saml based sso, on clicking saml, a configuration page appears
* Go to your zscaler app, under settings setup saml idp etc etc. upload all the config stuff to demo application
* You also need to add few apis there, callback api urls etc, add those too
* Under attributes and claims section, add claims and do that in zscaler app as well
* All done, now test it
* Now going to any website like microsoft.com goes through a zscaler proxy, microsoft authentication page comes, enter microsoft credentials, it will login and redirect me to original website
