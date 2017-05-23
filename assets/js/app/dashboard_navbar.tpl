           <nav>
                      {$navbar}                     
                   
            </nav>
            
               <nav>
                 <ul id="main-navigation" class="clearfix" style="top:-41px;right:5px;position:absolute;"> 
                    <li class="fr dropdown"> 
                        <a href="#" class="with-profile-image"><span><img src="{$base_url}images/profile-image.png" /></span>{$nametag}</a> 
                        <ul> 
{*                            <li><a href="#">Profile Company</a></li> *}
{*                            <li><a href="#">Change Password</a></li> *}
                            <li><a href="{$site_url}/dashboard/logout">Signout</a></li> 
                        </ul>
                    </li> 
                </ul>
            </nav>