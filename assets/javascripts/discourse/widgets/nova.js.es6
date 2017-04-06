import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { avatarImg } from 'discourse/widgets/post';
import { cook } from 'discourse/lib/text';
import RawHtml from 'discourse/widgets/raw-html';
import showModal from 'discourse/lib/show-modal';
import Composer from 'discourse/models/composer';
import { getOwner } from 'discourse-common/lib/get-owner';
import NotificationsButton from 'discourse/components/notifications-button';



export default createWidget('nova', {
  tagName: 'div.nova.widget-container',
  buildKey: (attrs) => 'nova',

  defaultState(attrs) {
    return {
      topic: attrs.topic,
      bookmarked: attrs.topic ? attrs.topic.bookmarked : null
    }
  },

  canInviteToForum() {
    return Discourse.User.currentProp('can_invite_to_forum');
  },

  toggleBookmark() {
    this.state.bookmarked = !this.state.bookmarked
    const topicController = this.register.lookup('controller:topic')
    topicController.send('toggleBookmark')
  },

  sendShowLogin() {
    const appRoute = this.register.lookup('route:application');
    appRoute.send('showLogin');
  },

  sendShowCreateAccount() {
    const appRoute = this.register.lookup('route:application');
    appRoute.send('showCreateAccount');
  },

  showInvite() {
    const topicRoute = this.register.lookup('route:topic');
    topicRoute.send('showLogin');
  },

  createTopic() {
    const cController = this.register.lookup('controller:composer');
    const dtController = this.register.lookup('controller:discovery/topics');
    cController.open({
      categoryId: dtController.get('category.id'),
      action: Composer.CREATE_TOPIC,
      draftKey: dtController.get('model.draft_key'),
      draftSequence: dtController.get('model.draft_sequence')
    });
  },

  html(attrs, state) {
    const { currentUser } = this;
    const topic = state.topic;
    const cate = attrs.category;
    var days;
    var count;
    const category = attrs.category;
    let contents = [];
    

    const path = getOwner(this).lookup('controller:application').get('currentPath');

    var v1 = 0, size = 0;
    var unread = 0;
    var data = Discourse.Category.list();
    if (path == "discovery.latest")
    {
        contents.push(h("h2.novatitle", [Discourse.SiteSettings['nova-before-link'] + " ",h("a.what", {attributes:{href: "t/ابتکار-جمعی-یعنی-چه-و-چه-جوری-کار-میکنه؟/3601"}}, Discourse.SiteSettings['nova-link']),Discourse.SiteSettings['nova-after-link']]));
         for (var i = 0 ; i < data.length ; i++) 
        {
            count = data[i].topic_count;
            unread = 0 ;
            if (data[i].slug[0] == "n" && data[i].slug[1] == "o" && data[i].slug[2] == "v" && data[i].slug[3] == "a") 
            {
              $.ajax({
                url: "/c/"+ data[i].id +"/l/unread.json",
                dataType: 'json',
                async: false,
                success: function(dataa){
                for (var x = 0 ; x < dataa.topic_list.topics.length ; x++)
                {
                    unread = dataa.topic_list.topics[x].unread + unread;
                    unread = dataa.topic_list.topics[x].new_posts + unread;
                }
              }});
                v1++;
                for (var j = 0; j < data.length; j++) 
                    if ( data[i].id == data[j].get('parent_category_id') )
                        count = count + data[j].topic_count;

                size = 20;

                for (var j = 0; j < count ; j++)
                    if (size < 150)
                        size = size + 1;

                var strsizr = size + "px";
                var url;
                var color = Discourse.Category.findBySlug(data[i].slug).color;
                if (Discourse.Category.findBySlug(data[i].slug).uploaded_logo) 
                {
                  url = Discourse.Category.findBySlug(data[i].slug).uploaded_logo.url;
                }
                else
                  url = "/uploads/default/original/2X/b/b0f2632cc41f8568abafec7218140e4a46efcbac.png";
                if(unread == 0)
                {
                  
                  if (Discourse.SiteSettings[data[i].slug])
                  {
                      var target_date = new Date(Discourse.SiteSettings[data[i].slug + "-date"]).getTime();
                      var current_date = new Date().getTime();
                      var seconds_left = (target_date - current_date) / 1000;
                      days = parseInt(seconds_left / 86400);

                      contents.push(h("div." + data[i].slug, {attributes: {style : "background-color: #" + color + ";"}},[h("a",
                                                                      {attributes: {href: "/c/" + data[i].slug + Discourse.SiteSettings[data[i].slug + "-link"]}},
                                                                      [h("h3",data[i].name),h("img.nova", 
                                                                      {attributes: 
                                                                       {src: url,
                                                                       width: strsizr, height: strsizr
                                                                        }})]),h("h4.daysleft", "پایان: " + days + " روز")]));
                  }
                  else
                  {
                    contents.push(h("div." + data[i].slug, {attributes: {style : "background-color: #" + color + ";"}},[h("a",
                                                                      {attributes: {href: "/c/" + data[i].slug}},
                                                                      [h("h3",data[i].name),h("img.nova", 
                                                                      {attributes: 
                                                                      {src: url,
                                                                       width: strsizr, height: strsizr
                                                                       }})])]));
                  }
                }
                else
                {
                  if (Discourse.SiteSettings[data[i].slug])
                  {
                    var target_date = new Date(Discourse.SiteSettings[data[i].slug + "-date"]).getTime();
                      var current_date = new Date().getTime();
                      var seconds_left = (target_date - current_date) / 1000;
                      days = parseInt(seconds_left / 86400);

                    contents.push(h("div." + data[i].slug, {attributes: {style : "background-color: #" + color + ";"}},[h("a",
                                                                      {attributes: {href: "/c/" + data[i].slug +  Discourse.SiteSettings[data[i].slug + "-link"]}},
                                                                      [h("h3",[data[i].name ,h("sup.badge-notification.new-posts", {attributes:{title: "موضوع تازه"}},unread + " ")]),h("img.nova", 
                                                                    {attributes: 
                                                                        {src: url,
                                                                          width: strsizr, height: strsizr
                                                                             }})]),h("h4.daysleft", "پایان: " + days + " روز")]));
                  }
                  else
                  {
                    contents.push(h("div." + data[i].slug, {attributes: {style : "background-color: #" + color + ";"}},[h("a",
                                                                      {attributes: {href: "/c/" + data[i].slug}},
                                                                      [h("h3",[data[i].name ,h("sup.badge-notification.new-posts", {attributes:{title:"موضوع تازه"}}, unread + " ")]),h("img.nova", 
                                                                        {attributes: 
                                                                          {src: url,
                                                                         width: strsizr, height: strsizr
                                                                           }})])]));
              }
                }
                

            }
            if (v1 == 5)
                break;
            
        }
        contents.push(h("br"));
        contents.push(h("form", {attributes: {action: "http://www.eventbox.ir/forms/show/508?utm_source=create%20nova-main%20page&utm_campaign=create%20nova-main%20page&utm_medium=create%20nova-main%20page&utm_term=create%20nova-main%20page&utm_content=create%20nova-main%20page" ,target: "_blank"}}, h("input.btn.btn-default.create-nova", {attributes: {type: "submit", value: "+ آغازگر نوآ باش!"}})));
    }
    return h('div.widget-inner', contents);
  }

});
