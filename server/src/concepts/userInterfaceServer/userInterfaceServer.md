# User Interface Server Brand
Further unifies user interface and brand concepts into a complete conceptual set

## Reason for this approach.
We are aiming to create a set of concepts that utilize different qualities based upon their intended location.
In this case the server concept is responsible for handling cached data and in the case of a unifying user interface concept with a brand, we are caching their page data to be Loaded onto a client. Where the client would unify the user interface brand to further alter how that conceptual set functions.

In order to accomplish this feat. We are utilizing the compositional nature of ActionStrategies. Where the user interface concept enables the creation of HTML interface strategies, those strategies do not directly add to any single concept. Therefore by limiting the strategies in this compositional format. We can alter the final output via strategy composition. Where a strategy may use part of a strategy as either the beginning or end of the intended strategy.

In the case of the Server we are maintaining the compositions, but at the same time caching their compiled form. If a change alters the state of the data that one aspect of that composition depends upon. We may recompose atomically the stored cache of that page. To accomplish such, we are utilizing semaphores, a new unified concept that refers directly to the subscribed actions that would be responsible for that specific change for the page composition, based on signaled location. Utilizing the semaphore concept to dispatch and change atomically the effected composition.

It is important to note classically semaphores have been used as a locking mechanism in computing. Here we are using them in their original form. Whereby different flag signals would relay to some message that the receiving party would have reference to. This was one of the original forms of the internet, where you would have watch towers in sight of one another pass along a series of flag signals. What is interesting about this approach is that only the sender or receiver needs to know what the semaphore actually relays to. Where the relays themselves could likewise just pass along the semaphores without knowing their true meaning.

How computer scientists took a messaging concept and turned into into a locking concept is personally beyond me.

With this approach. We then may unify on the client the same user interface brand concept, except with that of the client. Where the client would effect the same change if enabled via the selector binding. While informing the server of any new changes on the concept. This enables both changes to occur simultaneously on both the client and the server atomically.
